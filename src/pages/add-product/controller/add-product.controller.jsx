import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddProductView } from '../view/add-product.view';
import { request } from '../../../services/api';
import Swal from 'sweetalert2';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

export function AddProductController() {
  const location = useLocation(); // Usado para saber se é um ingrediente
  const navigate = useNavigate();

  // Detectar se é ingrediente ou produto baseado no location.state
  const isAddingIngredient = location.state?.isIngredient === true;

  const [fields, setFields] = useState({
    mainCategory: '',
    subCategory: '',
    name: '',
    isPremium: false,
    price: '',
  });
  const [isLoading, setIsLoading] = useState(false);

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

  // Função para criar novo produto/ingrediente
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação básica dos campos obrigatórios
    if (!fields.name.trim()) {
      Swal.fire('Erro!', 'O nome do produto é obrigatório.', 'error');
      return;
    }

    if (!fields.mainCategory) {
      Swal.fire('Erro!', 'A categoria principal é obrigatória.', 'error');
      return;
    }

    if (!fields.subCategory) {
      Swal.fire('Erro!', 'A categoria específica é obrigatória.', 'error');
      return;
    }

    if (!fields.price || parseFloat(fields.price) <= 0) {
      Swal.fire('Erro!', 'O preço deve ser maior que zero.', 'error');
      return;
    }

    setIsLoading(true);

    let endpoint;
    let payload;
    
    if (isAddingIngredient) {
      // É um INGREDIENTE
      endpoint = '/ingredientes';
      payload = {
        nome: fields.name,
        is_premium: fields.isPremium,
        ativo: true,
        // Mapear subCategory para idTipoIngrediente baseado na categoria
        idTipoIngrediente: getTipoIngredienteId(fields.subCategory),
      };
    } else {
      // É um PRODUTO
      endpoint = '/produtos';
      payload = {
        descricao: fields.name,
        precoUnitario: parseFloat(fields.price),
        categoria: fields.subCategory,
        unidadeMedida: 'unidade',
        ativo: true,
        temIngrediente: false,
      };
    }

    try {
      await request.post(endpoint, payload);
      
      // Mostrar popup de sucesso com aviso de redirecionamento
      Swal.fire({
        title: 'Sucesso!',
        text: 'Produto criado com sucesso! Redirecionando para o catálogo...',
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
      Swal.fire('Erro!', 'Não foi possível criar o produto. Tente novamente em alguns instantes.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Função auxiliar para mapear categoria para ID do tipo de ingrediente
  const getTipoIngredienteId = (subCategory) => {
    // Mapear as categorias para IDs de tipo de ingrediente
    // Estes IDs devem corresponder aos tipos de ingrediente no backend
    const tipoIngredienteMap = {
      'Massa': 1,
      'Recheio': 2,
      'Adicional': 3,
    };
    
    return tipoIngredienteMap[subCategory] || 1; // Default para Massa
  };

  return (
    <AddProductView
      fields={fields}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isAddingIngredient={isAddingIngredient}
    />
  );
}