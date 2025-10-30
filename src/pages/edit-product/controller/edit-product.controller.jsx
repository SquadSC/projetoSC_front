import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { EditProductView } from '../view/edit-product.view';
import { request } from '../../../services/api';
import Swal from 'sweetalert2';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

export function EditProductController() {
  const { id } = useParams(); // Pega o ID da URL
  const location = useLocation(); // Usado para saber se é um ingrediente
  const navigate = useNavigate();

  // Detectar se é ingrediente ou produto baseado no location.state
  const isEditingIngredient = location.state?.isIngredient === true;

  const [fields, setFields] = useState({
    mainCategory: '',
    subCategory: '',
    name: '',
    isPremium: false,
    price: '',
    unidade: '', // Campo para unidade de medida dos itens complementares
  });
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados iniciais do item ao carregar a página
  useEffect(() => {
    const loadItemData = async () => {
      // Usar os dados que já estão disponíveis através do location.state
      const item = location.state?.item;
      
      if (item) {
        loadItemIntoForm(item);
      } else {
        // Se não tem dados no state, buscar da API
        try {
          let itemData;
          // Tentar primeiro como ingrediente, depois como produto
          try {
            const response = await request.get(`/ingredientes/${id}`);
            itemData = response.data;
            loadItemIntoForm(itemData);
          } catch (ingredientError) {
            // Se não for ingrediente, mostrar erro para produtos
            throw new Error("Produto não encontrado. Volte à lista de produtos.");
          }
        } catch (error) {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível carregar os dados do item. Retornando ao catálogo...',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
          setIsLoading(false);
          
          // Redirecionar automaticamente após 2 segundos
          setTimeout(() => {
            navigate(ROUTES_PATHS.PRODUCTS);
          }, 2000);
        }
      }
    };

    const loadItemIntoForm = (item) => {
      // Detectar se é ingrediente baseado nos dados do item
      const isIngredient = item.nome !== undefined || item.tipoIngrediente !== undefined || item.idIngrediente !== undefined;
      // Detectar se é da tabela de preços
      const isPriceTable = item.isPriceTable === true;
      
      // Mapeia os dados do item para o estado do formulário
      if (isIngredient) {
        // Mapear a descrição do tipoIngrediente para as opções do select
        const tipoIngrediente = item.tipoIngrediente?.descricao || '';
        let subCategoryMapped = '';
        
        // Mapear para as opções disponíveis no select
        if (tipoIngrediente.toLowerCase().includes('massa')) {
          subCategoryMapped = 'Massa';
        } else if (tipoIngrediente.toLowerCase().includes('recheio')) {
          subCategoryMapped = 'Recheio';
        } else if (tipoIngrediente.toLowerCase().includes('adicional')) {
          subCategoryMapped = 'Adicional';
        } else {
          // Se não encontrar correspondência, usar a primeira opção
          subCategoryMapped = 'Massa';
        }
        
        setFields({
          mainCategory: 'componente-bolo',
          subCategory: subCategoryMapped,
          name: item.nome,
          isPremium: item.premium || false,
          price: item.preco || '', // Ingredientes podem não ter preço direto
          unidade: '', // Ingredientes não têm unidade
        });
      } else if (isPriceTable) {
        // É um item da TABELA DE PREÇOS
        setFields({
          mainCategory: 'tabela-precos',
          subCategory: item.descricao, // Nome do produto como subcategoria
          name: item.descricao, // Campo descricao do banco
          isPremium: false, // Itens da tabela não são premium
          price: item.preco || item.precoUnitario || '',
          unidade: item.unidadeMedida || 'kg', // Carrega unidade real do banco
        });
      } else {
        setFields({
          mainCategory: 'itens-complementares',
          subCategory: item.categoria || '',
          name: item.descricao,
          isPremium: item.premium || false,
          price: item.precoUnitario || '',
          unidade: item.unidade_medida || item.unidadeMedida || '', // Carrega unidade existente
        });
      }
      setIsLoading(false);
    };

    loadItemData();
  }, [id, isEditingIngredient, location.state]);

  // Lida com a mudança de qualquer campo do formulário
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFields(prev => ({
      ...prev,
      // Se for o select principal, reseta a subcategoria
      ...(name === 'mainCategory' && { subCategory: '' }),
      // Lida com o checkbox
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Função "inteligente" para salvar
  const handleSubmit = async (event) => {
    event.preventDefault();

    let endpoint;
    let payload;

    const item = location.state?.item; // Usar apenas location.state
    
    // Detectar se é ingrediente baseado nos dados do item
    const isIngredient = item?.nome !== undefined || item?.tipoIngrediente !== undefined || item?.idIngrediente !== undefined;
    // Detectar se é da tabela de preços
    const isPriceTable = item?.isPriceTable === true;
    
    if (isIngredient) {
      // É um INGREDIENTE
      endpoint = `/ingredientes/${id}`;
      payload = {
        nome: fields.name,
        is_premium: fields.isPremium, // Corrigir o nome do campo para is_premium
        ativo: item?.ativo ?? true, // Incluir o status ativo do ingrediente
        idTipoIngrediente: item?.tipoIngrediente?.idTipoIngrediente, // Incluir o ID do tipo de ingrediente
      };
    } else if (isPriceTable) {
      // É um item da TABELA DE PREÇOS
      endpoint = `/produtos/${id}`;
      payload = {
        descricao: fields.name,
        precoUnitario: parseFloat(fields.price),
        categoria: 'Tabela de Preços', // Manter categoria fixa para tabela de preços
        unidadeMedida: fields.unidade || 'kg', // Usar unidade do formulário ou padrão kg
        ativo: item?.ativo ?? true,
        temIngrediente: false, // Itens da tabela não têm ingredientes
      };
    } else {
      // É um PRODUTO
      endpoint = `/produtos/${id}`;
      payload = {
        descricao: fields.name,
        precoUnitario: parseFloat(fields.price),
        categoria: fields.subCategory,
        unidadeMedida: fields.unidade || 'unidade', // Usar unidade do formulário ou padrão
        ativo: item?.ativo ?? true, // Incluir o status ativo do produto
        temIngrediente: item?.temIngrediente ?? false, // Incluir se tem ingrediente
        // Remover campo 'premium' que não existe no ProdutoRequest
      };
    }

    try {
      await request.put(endpoint, payload);
      
      // Mostrar popup de sucesso com aviso de redirecionamento
      Swal.fire({
        title: 'Sucesso!',
        text: 'Item atualizado com sucesso! Redirecionando para o catálogo...',
        icon: 'success',
        timer: 2000, // 2 segundos
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate(ROUTES_PATHS.PRODUCTS);
      }, 2000);
      
    } catch (error) {
      Swal.fire('Erro!', 'Não foi possível salvar as alterações. Tente novamente em alguns instantes.', 'error');
    }
  };

  return (
    <EditProductView
      fields={fields}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isEditingIngredient={isEditingIngredient}
    />
  );
}