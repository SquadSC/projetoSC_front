import { useState, useCallback, useMemo } from 'react';

/**
 * Hook para cálculo de preços do bolo personalizado
 */
export function usePriceCalculator(essentials = []) {
  const [weight, setWeight] = useState(1);

  // Obtém preço base por tipo de produto
  const getBasePrice = useCallback(
    cakeType => {
      if (!cakeType || !essentials.length) return 0;

      const baseProduct = essentials.find(
        item => item.descricao?.toLowerCase() === cakeType.toLowerCase(),
      );

      return parseFloat(baseProduct?.precoUnitario || 0);
    },
    [essentials],
  );

  // Obtém preço por adicional
  const getAdditionalPrice = useCallback(() => {
    const additionalProduct = essentials.find(
      item => item.descricao?.toLowerCase() === 'adicionais',
    );

    return parseFloat(additionalProduct?.precoUnitario || 0);
  }, [essentials]);

  // Calcula preço total do produto
  const calculateTotalPrice = useCallback(
    (cakeType, selectedIngredients, ingredients = []) => {
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
      if (!cakeType || !essentials.length) return 0;

      const baseProduct = essentials.find(
        item => item.descricao?.toLowerCase() === cakeType.toLowerCase(),
      );

      return baseProduct?.idProduto || 0;
    },
    [essentials],
  );

  // Informações de preço organizadas
  const priceInfo = useMemo(() => {
    return {
      weight,
      basePrice: cakeType => getBasePrice(cakeType) * weight,
      additionalPrice: getAdditionalPrice() * weight,
      totalPrice: (cakeType, selectedIngredients, ingredients) =>
        calculateTotalPrice(cakeType, selectedIngredients, ingredients),
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
