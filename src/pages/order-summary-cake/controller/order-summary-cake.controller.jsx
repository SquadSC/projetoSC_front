import { useEffect, useState, useCallback, useMemo } from 'react';
import { OrderSummaryCakeView } from '../view/order-summary-cake.view';
import { useReferencesImages } from '../../../hooks/useReferencesImages/useReferencesImages';
import { request } from '../../../services/api';

// Constantes para regras de negócio
const CAKE_RULES = {
  MASSA: { min: 1, max: 1 },
  RECHEIO: { min: 1, max: 2 }, // RECHEIO É OBRIGATÓRIO
  ADICIONAIS: { min: 0, max: Infinity },
};

const INGREDIENT_TYPES = {
  MASSA: 'massa',
  RECHEIO_BASICO: 'recheio',
  RECHEIO_PREMIUM: 'recheio',
  ADICIONAIS: 'adicionais',
};

// Tipos de pedido baseados APENAS no recheio
const ORDER_TYPES = {
  BASICO: 'basico', // Todos os recheios são básicos
  PREMIUM: 'premium', // Pelo menos um recheio é premium
};

export function OrderSummaryCakeController() {
  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);

  // Estado principal do produto
  const [product, setProduct] = useState({
    idProduct: '',
    price: 0,
    quantity: 1,
    theme: '',
    observation: '',
    attachment: '',
    weight: 1,
    ingredientList: [],
  });

  // Estado para ingredientes selecionados organizados por tipo
  const [selectedIngredients, setSelectedIngredients] = useState({
    massa: [],
    recheio: [],
    adicionais: [],
  });

  // Estado para determinar o tipo de pedido baseado no recheio
  const [orderType, setOrderType] = useState(null); // null até selecionar recheio

  const [errors, setErrors] = useState({
    massa: '',
    recheio: '',
    attachment: '',
    general: '',
  });

  // Função para validar se pode avançar para próximo step
  const validateCurrentStep = useCallback(() => {
    switch (activeStep) {
      case 0: // Validação dos ingredientes básicos
        const hasValidMassa =
          selectedIngredients.massa.length === CAKE_RULES.MASSA.max;
        const hasValidRecheio =
          selectedIngredients.recheio.length >= CAKE_RULES.RECHEIO.min &&
          selectedIngredients.recheio.length <= CAKE_RULES.RECHEIO.max;

        console.log('✅ VALIDAÇÃO STEP 0:', {
          hasValidMassa,
          hasValidRecheio,
          massaCount: selectedIngredients.massa.length,
          recheioCount: selectedIngredients.recheio.length,
          selectedIngredients,
          orderType,
          rules: CAKE_RULES,
        });

        return hasValidMassa && hasValidRecheio;
      case 1: // Validação da imagem/tema
        return product.theme || product.attachment;
      case 2: // Validação dos detalhes adicionais
        return true; // Detalhes são opcionais
      default:
        return true;
    }
  }, [activeStep, selectedIngredients, product.theme, product.attachment]);

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) {
      setErrors(prev => ({
        ...prev,
        general:
          'Por favor, complete todos os campos obrigatórios antes de continuar.',
      }));
      return;
    }

    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }

    // Limpa erros ao avançar
    setErrors(prev => ({ ...prev, general: '' }));
  }, [activeStep, maxStepReached, validateCurrentStep]);

  const { images, loading, error, refetch } = useReferencesImages();

  // Estados para upload de imagem
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userUploadedImage, setUserUploadedImage] = useState(null);
  const [selectedReferenceImage, setSelectedReferenceImage] = useState(null);

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    // Validações
    if (!selectedFile.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        attachment: 'Apenas arquivos de imagem são permitidos.',
      }));
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB
      setErrors(prev => ({
        ...prev,
        attachment: 'A imagem deve ter no máximo 5MB.',
      }));
      return;
    }

    setUploading(true);
    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      setPreview(base64String);

      const userImage = {
        id_anexo: 'user-upload',
        nome_arquivo: selectedFile.name.split('.')[0],
        imagem_anexo: base64String,
        isUserUpload: true,
      };

      setUserUploadedImage(userImage);

      setErrors(prev => ({ ...prev, attachment: '' }));
      setUploading(false);
    };

    reader.onerror = () => {
      setErrors(prev => ({
        ...prev,
        attachment: 'Erro ao processar a imagem.',
      }));
      setUploading(false);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleImageSelection = imageRef => {
    if (selectedReferenceImage?.id_anexo === imageRef.id_anexo) {
      setSelectedReferenceImage(null);
      setProduct(prev => ({ ...prev, attachment: '' }));
    } else {
      setSelectedReferenceImage(imageRef);
      setProduct(prev => ({ ...prev, attachment: imageRef.imagem_anexo }));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setUserUploadedImage(null);

    if (selectedReferenceImage?.isUserUpload) {
      setSelectedReferenceImage(null);
    }

    setProduct(prev => ({ ...prev, attachment: '' }));
    setErrors(prev => ({ ...prev, attachment: '' }));
  };

  const [essenciais, setEssenciais] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Função para organizar ingredientes por tipo
  const organizeIngredientsByType = useMemo(() => {
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

  // Carrega dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [ingredientsResponse, essentialsResponse] = await Promise.all([
          request.get('/ingredientes?ativos=true'),
          request.get('/produtos/getEssenciais'),
        ]);

        setIngredients(ingredientsResponse.data);
        setEssenciais(essentialsResponse.data);
        setApiError(null);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setApiError('Erro ao carregar ingredientes. Tente novamente.');
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para determinar o tipo de pedido baseado APENAS nos recheios selecionados
  const determineOrderType = useCallback(
    (selectedRecheios, ingredientsList) => {
      if (!selectedRecheios || selectedRecheios.length === 0) {
        // ERRO: Recheio é obrigatório
        return null;
      }

      // Verifica se algum recheio selecionado é premium
      const hasAnyPremium = selectedRecheios.some(recheioId => {
        const recheio = ingredientsList.find(
          ing => ing.idIngrediente === recheioId,
        );
        return recheio?.premium === true;
      });

      // Se tem pelo menos um recheio premium → PREMIUM
      // Se só tem recheios básicos → BÁSICO
      return hasAnyPremium ? ORDER_TYPES.PREMIUM : ORDER_TYPES.BASICO;
    },
    [],
  );

  // Função para gerenciar seleção de ingredientes
  const handleIngredientSelection = useCallback(
    (ingredientType, ingredientId, isSelected) => {
      const typeKey = ingredientType.toLowerCase().replace(' ', '');

      setSelectedIngredients(prev => {
        const currentSelection = prev[typeKey] || [];
        const rules = CAKE_RULES[ingredientType.toUpperCase()] || {
          min: 0,
          max: Infinity,
        };

        let newSelection;
        if (isSelected) {
          // Adicionar ingrediente
          if (currentSelection.length < rules.max) {
            newSelection = [...currentSelection, ingredientId];
          } else {
            // Se atingiu o máximo, substitui o primeiro (para massa)
            if (rules.max === 1) {
              newSelection = [ingredientId];
            } else {
              newSelection = currentSelection;
            }
          }
        } else {
          // Remover ingrediente
          newSelection = currentSelection.filter(id => id !== ingredientId);
        }

        return {
          ...prev,
          [typeKey]: newSelection,
        };
      });

      // Limpa erros relacionados ao tipo
      setErrors(prev => ({
        ...prev,
        [typeKey]: '',
      }));

      // Valida se recheio é obrigatório
      if (typeKey === 'recheio' && newSelection.length === 0) {
        setErrors(prev => ({
          ...prev,
          recheio: 'Selecione pelo menos 1 recheio. É obrigatório!',
        }));
      }
    },
    [],
  );

  // Calcula o preço total baseado nos ingredientes selecionados
  const calculateTotalPrice = useCallback(() => {
    if (!ingredients.length || !essenciais.length) return 0;

    let total = 0;
    const additionalPrice =
      essenciais.find(item => item.descricao?.toLowerCase() === 'adicionais')
        ?.precoUnitario || 0;

    // Soma preços dos ingredientes selecionados
    Object.values(selectedIngredients)
      .flat()
      .forEach(ingredientId => {
        const ingredient = ingredients.find(
          ing => ing.idIngrediente === ingredientId,
        );
        if (
          ingredient?.tipoIngrediente?.descricao?.toLowerCase() === 'adicionais'
        ) {
          total += additionalPrice * product.weight;
        }
      });

    return total;
  }, [selectedIngredients, ingredients, essenciais, product.weight]);

  // Atualiza o produto quando ingredientes ou preços mudam
  useEffect(() => {
    const selectedIngredientsObjects = Object.values(selectedIngredients)
      .flat()
      .map(id =>
        ingredients.find(ingredient => ingredient.idIngrediente === id),
      )
      .filter(Boolean);

    const totalPrice = calculateTotalPrice();

    // Determina o tipo de pedido baseado nos recheios selecionados
    const newOrderType = determineOrderType(
      selectedIngredients.recheio,
      ingredients,
    );
    setOrderType(newOrderType);

    setProduct(prev => ({
      ...prev,
      ingredientList: selectedIngredientsObjects,
      price: totalPrice,
      orderType: newOrderType, // Adicionando o tipo de pedido ao produto
    }));
  }, [
    selectedIngredients,
    ingredients,
    calculateTotalPrice,
    determineOrderType,
  ]);

  const stepConfig = {
    nextStep: handleNext,
    activeStep,
    maxStepReached,
    setActiveStep,
    canAdvance: validateCurrentStep(),
  };

  const cakeData = {
    product,
    setProduct,
    selectedIngredients,
    handleIngredientSelection,
    organizedIngredients: organizeIngredientsByType,
    errors,
    setErrors,
    weight: product.weight,
    setWeight: weight => setProduct(prev => ({ ...prev, weight })),
    rules: CAKE_RULES,
    orderType,
    setOrderType,
    orderTypes: ORDER_TYPES,
  };

  const imageData = {
    file,
    preview,
    uploading,
    handleFileChange,
    removeImage,
    images: userUploadedImage ? [userUploadedImage, ...images] : images,
    loading,
    error,
    refetch,
    userUploadedImage,
    selectedReferenceImage,
    setSelectedReferenceImage: handleImageSelection,
  };

  // Mostra loading enquanto carrega dados iniciais
  if (dataLoading) {
    return <div>Carregando ingredientes...</div>;
  }

  // Mostra erro se houve falha na API
  if (apiError) {
    return <div>Erro: {apiError}</div>;
  }

  return (
    <OrderSummaryCakeView
      stepConfig={stepConfig}
      cakeData={cakeData}
      imageData={imageData}
      ingredients={ingredients}
      essentials={essenciais}
    />
  );
}
