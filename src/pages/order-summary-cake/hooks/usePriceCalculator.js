import { useState, useCallback, useMemo } from 'react';

/**
 * Hook para cálculo de preços do bolo personalizado
 */
export function usePriceCalculator(essentials = []) {
  const [weight, setWeight] = useState(1);

  // Garantir que essentials é sempre um array e validado
  const essentialsArray = useMemo(() => {
    if (!essentials) return [];
    if (Array.isArray(essentials)) return essentials;
    // Se for um objeto, tentar extrair dados
    if (typeof essentials === 'object') {
      return essentials.data || essentials.produtos || [];
    }
    return [];
  }, [essentials]);

  // Obtém preço base por tipo de produto
  const getBasePrice = useCallback(
    cakeType => {
      if (!cakeType || !essentialsArray.length) return 0;

      const baseProduct = essentialsArray.find(
        item => item.descricao?.toLowerCase() === cakeType.toLowerCase(),
      );

      return parseFloat(baseProduct?.precoUnitario || 0);
    },
    [essentialsArray],
  );

  // Obtém preço por adicional
  const getAdditionalPrice = useCallback(() => {
    const additionalProduct = essentialsArray.find(
      item => item.descricao?.toLowerCase() === 'adicionais',
    );

    return parseFloat(additionalProduct?.precoUnitario || 0);
  }, [essentialsArray]);

  // Calcula preço total do produto
  const calculateTotalPrice = useCallback(
    (cakeType, selectedIngredients) => {
      let totalPrice = 0;

      // Preço base do bolo
      const basePrice = getBasePrice(cakeType);
      totalPrice += basePrice * weight;

      // Preço dos adicionais
      const additionalPrice = getAdditionalPrice();
      const additionalCount = selectedIngredients.adicionais?.length || 0;
      totalPrice += additionalPrice * additionalCount * weight;

      return totalPrice;
    },
    [weight, getBasePrice, getAdditionalPrice],
  );

  // Obtém ID do produto base
  const getProductId = useCallback(
    cakeType => {
      if (!cakeType || !essentialsArray.length) return 0;

      const baseProduct = essentialsArray.find(
        item => item.descricao?.toLowerCase() === cakeType.toLowerCase(),
      );

      return baseProduct?.idProduto || 0;
    },
    [essentialsArray],
  );

  // Informações de preço organizadas
  const priceInfo = useMemo(() => {
    return {
      weight,
      basePrice: cakeType => getBasePrice(cakeType) * weight,
      additionalPrice: getAdditionalPrice() * weight,
      totalPrice: (cakeType, selectedIngredients) =>
        calculateTotalPrice(cakeType, selectedIngredients),
    };
  }, [weight, getBasePrice, getAdditionalPrice, calculateTotalPrice]);

  return {
    weight,
    setWeight,
    calculateTotalPrice,
    getProductId,
    priceInfo,
    getBasePrice,
    getAdditionalPrice,
  };
}
