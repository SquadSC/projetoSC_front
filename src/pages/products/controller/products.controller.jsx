import * as React from 'react';
import { ProductsView } from '../view/products.view';
import { request } from '../../../services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

export function ProductsController() {
  const navigate = useNavigate();
  const [showInactive, setShowInactive] = React.useState(false);
  const isLoadingRef = React.useRef(false);

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
    if (isLoadingRef.current) {
      return;
    }
    
    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      const [productsResponse, ingredientsResponse] = await Promise.all([
        request.get('/produtos'),
        request.get('/ingredientes'),
      ]);

      // Combina produtos e ingredientes em uma única lista
      const allItems = [
        // Produtos regulares
        ...productsResponse.data.map(prod => ({
          ...prod,
          isIngredient: false,
          unidade_medida: prod.unidade_medida || 'unidade',
          is_premium: prod.premium || false, // Mapeia premium para is_premium
          preco: prod.precoUnitario, // Mapeia precoUnitario para preco para compatibilidade
        })),
        // Ingredientes
        ...ingredientsResponse.data.map(ing => {
          return {
            ...ing,
            isIngredient: true,
            nome: ing.nome || ing.descricao,
            // Mantém o objeto tipoIngrediente completo para acessar o ID
            tipoIngrediente: ing.tipoIngrediente,
            is_premium: ing.premium || false, // Mapeia premium para is_premium
          };
        }),
      ];

      setProducts(allItems);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao carregar itens',
        text: 'Não foi possível carregar a lista de produtos e ingredientes.',
      });
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  // TODO: handler para edição de produto
  const handleEditProduct = (item) => {
    const isIngredient = item.isIngredient === true;
    
    // Corrigir a lógica de IDs - usar os IDs corretos do backend
    let itemId;
    if (isIngredient) {
      // Para ingredientes, usar idIngrediente se disponível, senão id
      itemId = item.idIngrediente || item.id;
    } else {
      // Para produtos, usar idProduto se disponível, senão id
      itemId = item.idProduto || item.id;
    }
    
    const path = ROUTES_PATHS.EDIT_PRODUCT.replace(':id', itemId);
    
    // 👇 PASSE O ESTADO 'isIngredient' DURANTE A NAVEGAÇÃO
    navigate(path, { state: { isIngredient, item } });
  };

  // TODO: handler para mostrar/ocultar inativos
  const handleShowInactiveChange = event => {
    setShowInactive(event.target.checked);
  };

  // handler para desativar um produto
  const handleToggleStatus = async item => {
    const isCurrentlyActive = item.ativo;
    const actionText = isCurrentlyActive ? 'desativar' : 'reativar';
    
    // Corrigir a lógica de IDs - usar os IDs corretos do backend
    let itemId;
    if (item.isIngredient) {
      // Para ingredientes, usar idIngrediente se disponível, senão id
      itemId = item.idIngrediente || item.id;
    } else {
      // Para produtos, usar idProduto se disponível, senão id
      itemId = item.idProduto || item.id;
    }
    
    const endpoint = item.isIngredient
      ? `/ingredientes/${itemId}`
      : `/produtos/${itemId}`;

    const result = await Swal.fire({
      title: `Deseja ${actionText} o item?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#38090D',
      cancelButtonColor: '#38090D',
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Sim, ${actionText}!`,
      customClass: {
        cancelButton: 'swal-cancel-button'
      }
    });

    if (result.isConfirmed) {
      try {
        // O backend PATCH não precisa de body, apenas do ID na URL
        const response = await request.patch(endpoint);
        await fetchProducts(); // Atualiza a lista
        Swal.fire({
          title: 'Sucesso!',
          text: `O item foi ${actionText}do com sucesso.`,
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      } catch (error) {
        Swal.fire('Erro!', `Não foi possível ${actionText} o item. Tente novamente.`, 'error');
      }
    }
  };

  // atualiza o termo de busca
  const filteredProducts = React.useMemo(() => {
    return products
      .filter(product => {
        // Primeiro, filtra por status (ativo/inativo)
        if (showInactive) {
          return true; // Se o checkbox estiver marcado, mostra todos
        }
        return product.ativo; // Se não, mostra apenas os ativos
      })
      .filter(product => {
        // Depois, filtra pela busca
        const query = searchQuery.toLowerCase();
        return (
          product?.nome?.toLowerCase().includes(query) ||
          product?.descricao?.toLowerCase().includes(query)
        );
      });
  }, [products, searchQuery, showInactive]);

  return (
    <ProductsView
      products={filteredProducts}
      isLoading={isLoading}
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      onEditProduct={handleEditProduct}
      onToggleStatus={handleToggleStatus} // Renomeado de onDeleteProduct
      showInactive={showInactive} // Passa o estado do checkbox
      onShowInactiveChange={handleShowInactiveChange} // Passa a função do checkbox
    />
  );
}