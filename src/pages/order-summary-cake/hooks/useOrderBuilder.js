import { useCallback } from 'react';

/**
 * Hook principal para construir o objeto de pedido no formato correto
 */
export function useOrderBuilder() {
  /**
   * Constrói o objeto do pedido no formato esperado pelo backend
   * @param {Object} params - Parâmetros do pedido
   * @param {Array} params.selectedIngredientIds - IDs dos ingredientes selecionados
   * @param {number} params.productId - ID do produto base
   * @param {number} params.weight - Peso do produto
   * @param {number} params.totalPrice - Preço total
   * @param {string} params.theme - Tema do bolo
   * @param {string} params.observation - Observação adicional
   * @param {number} params.attachmentId - ID do anexo (0 para upload do usuário)
   * @returns {Object} Objeto do pedido formatado
   */
  const buildOrderObject = useCallback(params => {
    const {
      userId = 0,
      selectedIngredientIds = [],
      productId = 0,
      weight = 1, // Usar weight em vez de quantity
      totalPrice = 0,
      theme = '',
      observation = '',
      attachmentId = 0,
    } = params;

    return {
      idCliente: userId, // Agora usa o userId passado como parâmetro
      idProduto: productId,
      quantidade: weight, // Quantidade baseada no peso
      preco: totalPrice,
      listaIngredientes: selectedIngredientIds, // Apenas IDs, não objetos
      informacaoBolo: {
        tema: theme,
        detalhes: observation,
        anexo: attachmentId,
      },
    };
  }, []);

  /**
   * Valida se o objeto do pedido está completo
   * @param {Object} orderObject - Objeto do pedido
   * @returns {Object} Resultado da validação
   */
  const validateOrder = useCallback(orderObject => {
    const errors = [];

    if (!orderObject.idProduto) {
      errors.push('Produto não identificado');
    }

    if (
      !orderObject.listaIngredientes ||
      orderObject.listaIngredientes.length === 0
    ) {
      errors.push('Nenhum ingrediente selecionado');
    }

    if (orderObject.preco <= 0) {
      errors.push('Preço inválido');
    }

    if (orderObject.quantidade <= 0) {
      errors.push('Peso inválido');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  return {
    buildOrderObject,
    validateOrder,
  };
}
