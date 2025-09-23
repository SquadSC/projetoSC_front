import * as React from 'react';
import { ProductsView } from '../view/products.view';
import { request } from '../../../services/api';
import Swal from 'sweetalert2';

export function ProductsController() {
    // estados para gerenciar a lista de produtos, loading e busca
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');

    // carrega os produtos quando o componente é montado
    React.useEffect(() => {
        fetchProducts();
    }, []);

    // função para buscar produtos e ingredientes na api
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const [productsResponse, ingredientsResponse] = await Promise.all([
                request.get('/produtos'),
                request.get('/ingredientes')
            ]);
            
            // Combina produtos e ingredientes em uma única lista
            const allItems = [
                // Produtos regulares
                ...productsResponse.data.map(prod => ({
                    ...prod,
                    isIngredient: false
                })),
                // Ingredientes
                ...ingredientsResponse.data.map(ing => {
                    return {
                        ...ing,
                        isIngredient: true,
                        nome: ing.nome || ing.descricao,
                        // Mantém o objeto tipoIngrediente completo para acessar o ID
                        tipoIngrediente: ing.tipoIngrediente
                    };
                })
            ];
            
            console.log('Produtos:', productsResponse.data);
            console.log('Ingredientes:', ingredientsResponse.data);
            console.log('Lista combinada:', allItems);
            
            setProducts(allItems);
        } catch (error) {
            console.error('Error fetching items:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao carregar itens',
                text: 'Não foi possível carregar a lista de produtos e ingredientes.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // handler para edição de produto (a ser implementado)
    const handleEditProduct = (product) => {
        console.log('Edit product:', product);
    };

    // handler para excluir um produto com confirmação
    const handleDeleteProduct = async (productId) => {
        const result = await Swal.fire({
            title: 'Confirmar exclusão',
            text: 'Tem certeza que deseja excluir este produto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await request.delete(`/produtos/${productId}`);
                await fetchProducts(); // atualiza a lista após excluir
                Swal.fire('Excluído!', 'O produto foi excluído com sucesso.', 'success');
            } catch (error) {
                console.error('Error deleting product:', error);
                Swal.fire('Erro!', 'Não foi possível excluir o produto.', 'error');
            }
        }
    };

    // atualiza o termo de busca
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // filtra produtos com base no termo de busca (memorizado para performance)
    const filteredProducts = React.useMemo(() => {
        return products.filter(product =>
            product?.nome?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product?.descricao?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            false
        );
    }, [products, searchQuery]);

    return (
        <ProductsView
            products={filteredProducts}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
        />
    );
}