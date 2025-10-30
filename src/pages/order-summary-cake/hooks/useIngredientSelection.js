import { useState, useCallback, useMemo, useEffect } from 'react';

/**
 * Constantes para regras de negócio dos ingredientes
 */
const INGREDIENT_RULES = {
  MASSA: { min: 1, max: 1, required: true },
  RECHEIO: { min: 1, max: 2, required: true },
  ADICIONAIS: { min: 0, max: Infinity, required: false },
};

const INGREDIENT_TYPES = {
  MASSA: 'massa',
  RECHEIO_BASICO: 'cobertura',
  RECHEIO_PREMIUM: 'cobertura',
  ADICIONAIS: 'adicionais',
};

/**
 * Hook para gerenciar seleção de ingredientes do bolo
 */
export function useIngredientSelection(ingredients = []) {
  const [selectedIngredients, setSelectedIngredients] = useState({
    massa: [],
    recheio: [],
    adicionais: [],
  });

  const [errors, setErrors] = useState({
    massa: '',
    recheio: '',
    adicionais: '',
  });

  // Organiza ingredientes por tipo
  const organizedIngredients = useMemo(() => {
    if (!ingredients || ingredients.length === 0) return {};

    const organized = {
      massa: [],
      recheioBasico: [],
      recheioPremium: [],
      adicionais: [],
    };

    ingredients.forEach(ingredient => {
      const type = ingredient.tipoIngrediente?.descricao?.toLowerCase();

      switch (type) {
        case INGREDIENT_TYPES.MASSA:
          organized.massa.push(ingredient);
          break;
        case INGREDIENT_TYPES.RECHEIO_BASICO:
          if (ingredient.premium) {
            organized.recheioPremium.push(ingredient);
          } else {
            organized.recheioBasico.push(ingredient);
          }
          break;
        case INGREDIENT_TYPES.ADICIONAIS:
          organized.adicionais.push(ingredient);
          break;
        default:
          console.warn(`Tipo de ingrediente não reconhecido: ${type}`);
      }
    });

    return organized;
  }, [ingredients]);

  // Determina se tem algum recheio premium selecionado
  const hasPremiumFilling = useMemo(() => {
    return selectedIngredients.recheio.some(recheioId => {
      const recheio = ingredients.find(ing => ing.idIngrediente === recheioId);
      return recheio?.premium === true;
    });
  }, [selectedIngredients.recheio, ingredients]);

  // Tipo do bolo baseado nos recheios selecionados
  const cakeType = useMemo(() => {
    if (selectedIngredients.recheio.length === 0) return null;
    return hasPremiumFilling ? 'Bolo Premium' : 'Bolo';
  }, [selectedIngredients.recheio.length, hasPremiumFilling]);

  // Função para selecionar/deselecionar ingrediente
  const toggleIngredient = useCallback((ingredientType, ingredientId) => {
    const typeKey = ingredientType.toLowerCase();
    const rules = INGREDIENT_RULES[ingredientType.toUpperCase()] || {
      min: 0,
      max: Infinity,
    };

    setSelectedIngredients(prev => {
      const currentSelection = prev[typeKey] || [];
      const isSelected = currentSelection.includes(ingredientId);
      let newSelection;

      if (isSelected) {
        // Remover ingrediente
        newSelection = currentSelection.filter(id => id !== ingredientId);
      } else {
        // Adicionar ingrediente
        if (currentSelection.length < rules.max) {
          newSelection = [...currentSelection, ingredientId];
        } else {
          // Se atingiu o máximo, substitui o primeiro (para massa que só permite 1)
          if (rules.max === 1) {
            newSelection = [ingredientId];
          } else {
            newSelection = currentSelection;
          }
        }
      }

      return {
        ...prev,
        [typeKey]: newSelection,
      };
    });

    // Limpa erros do tipo específico
    setErrors(prev => ({
      ...prev,
      [typeKey]: '',
    }));
  }, []);

  // Validação dos ingredientes selecionados
  const validation = useMemo(() => {
    const massaValid =
      selectedIngredients.massa.length === INGREDIENT_RULES.MASSA.max;
    const recheioValid =
      selectedIngredients.recheio.length >= INGREDIENT_RULES.RECHEIO.min &&
      selectedIngredients.recheio.length <= INGREDIENT_RULES.RECHEIO.max;
    const adicionaisValid = true; // Adicionais são sempre válidos (opcional)

    return {
      massa: massaValid,
      recheio: recheioValid,
      adicionais: adicionaisValid,
      isValid: massaValid && recheioValid && adicionaisValid,
    };
  }, [selectedIngredients]);

  // Atualiza erros baseado na validação
  useEffect(() => {
    const newErrors = { massa: '', recheio: '', adicionais: '' };

    if (!validation.massa && selectedIngredients.massa.length !== 0) {
      newErrors.massa = 'Selecione exatamente 1 tipo de massa.';
    }

    if (!validation.recheio && selectedIngredients.recheio.length !== 0) {
      if (selectedIngredients.recheio.length < INGREDIENT_RULES.RECHEIO.min) {
        newErrors.recheio = 'Selecione pelo menos 1 recheio.';
      } else if (
        selectedIngredients.recheio.length > INGREDIENT_RULES.RECHEIO.max
      ) {
        newErrors.recheio = 'Selecione no máximo 2 recheios.';
      }
    }

    setErrors(newErrors);
  }, [validation, selectedIngredients]);

  // Obtém todos os IDs dos ingredientes selecionados
  const getAllSelectedIds = useCallback(() => {
    return Object.values(selectedIngredients).flat();
  }, [selectedIngredients]);

  // Limpa todas as seleções
  const clearSelection = useCallback(() => {
    setSelectedIngredients({
      massa: [],
      recheio: [],
      adicionais: [],
    });
    setErrors({
      massa: '',
      recheio: '',
      adicionais: '',
    });
  }, []);

  return {
    selectedIngredients,
    organizedIngredients,
    errors,
    validation,
    cakeType,
    hasPremiumFilling,
    toggleIngredient,
    getAllSelectedIds,
    clearSelection,
    rules: INGREDIENT_RULES,
  };
}
