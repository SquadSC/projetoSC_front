import { useEffect, useState, useRef } from 'react';
import { request } from '../../../services/api';
import { useReferencesImages } from '../../../hooks/useReferencesImages/useReferencesImages';

// Hooks personalizados
import { useStepController } from '../hooks/useStepController';
import { useIngredientSelection } from '../hooks/useIngredientSelection';
import { useThemeAndImage } from '../hooks/useThemeAndImage';
import { usePriceCalculator } from '../hooks/usePriceCalculator';
import { useObservation } from '../hooks/useObservation';
import { useOrderBuilder } from '../hooks/useOrderBuilder';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

import { OrderSummaryCakeView } from '../view/order-summary-cake.view';

export function OrderSummaryCakeController() {
  // Estados para dados da API
  const [ingredients, setIngredients] = useState([]);
  const [essentials, setEssentials] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  // Hooks personalizados
  const stepController = useStepController(4);
  const ingredientSelection = useIngredientSelection(ingredients);
  const themeAndImage = useThemeAndImage();
  const priceCalculator = usePriceCalculator(essentials);
  const observation = useObservation(200);
  const orderBuilder = useOrderBuilder();
  const {
    images,
    loading: imagesLoading,
    error: imagesError,
  } = useReferencesImages();

  // Carrega dados iniciais da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [ingredientsResponse, essentialsResponse] = await Promise.all([
          request.get('/ingredientes?ativos=true'),
          request.get('/produtos/getEssenciais'),
        ]);

        setIngredients(ingredientsResponse.data);
        setEssentials(essentialsResponse.data);
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

  // Validação para avançar para próximo step
  const validateCurrentStep = () => {
    switch (stepController.activeStep) {
      case 0: // Etapa 1: Ingredientes
        return ingredientSelection.validation.isValid;
      case 1: // Etapa 2: Tema e Imagem
        return themeAndImage.isValid;
      case 2: // Etapa 3: Observação
        return observation.isValid;
      case 3: // Etapa 4: Resumo
        return true;
      default:
        return false;
    }
  };

  // Função para avançar etapa com validação
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      stepController.nextStep();
    }
  };

  // Função para finalizar pedido
  const handleSubmitOrder = async orderObject => {
    if (isSubmitting) return; // Previne múltiplas execuções

    setIsSubmitting(true);
    try {
      console.log('Preparando envio do pedido:', orderObject);

      // Verifica se o usuário anexou uma nova imagem que precisa ser enviada primeiro
      const themeData = themeAndImage.getSubmissionData();
      console.log('Theme data:', themeData);
      console.log(
        'Upload states - uploadedFile:',
        !!themeAndImage.uploadedFile,
        'uploadedImageData:',
        themeAndImage.uploadedImageData,
      );
      let finalOrderObject = { ...orderObject };

      finalOrderObject.forma_pagamento ='Pix'
      finalOrderObject.quantidade = priceCalculator.weight; // Quantidade igual ao peso

      // Se existe uma imagem uploadada pelo usuário que ainda não foi enviada ao backend
      if (themeAndImage.uploadedFile && !themeAndImage.uploadedImageData) {
        console.log('Upload de imagem necessário antes do envio do pedido');

        try {
          // Envia a imagem para o backend primeiro
          const uploadResult = await themeAndImage.uploadImageToBackend(
            themeAndImage.uploadedFile,
          );

          let imageId = 0;

          // Se uploadResult é um número (como 7), usa diretamente
          if (typeof uploadResult === 'number') {
            imageId = uploadResult;
          } else if (
            uploadResult &&
            (uploadResult.id || uploadResult.id_anexo)
          ) {
            // Se é um objeto, tenta extrair o ID
            imageId = uploadResult.id || uploadResult.id_anexo;
          }

          if (imageId && imageId !== 0) {
            finalOrderObject.informacaoBolo.anexo = imageId;
            console.log('Imagem enviada com sucesso. ID:', imageId);
          } else {
            throw new Error('Falha no upload da imagem - ID não retornado');
          }
        } catch (uploadError) {
          console.error('Erro no upload da imagem:', uploadError);
          alert('Erro ao enviar a imagem. Tente novamente.');
          throw uploadError;
        }
      } else if (themeAndImage.uploadedImageData) {
        // Se a imagem já foi enviada anteriormente, usa o ID existente
        let imageId = 0;

        // Se uploadedImageData é um número (como 7), usa diretamente
        if (typeof themeAndImage.uploadedImageData === 'number') {
          imageId = themeAndImage.uploadedImageData;
        } else {
          // Se é um objeto, tenta extrair o ID
          imageId =
            themeAndImage.uploadedImageData.id ||
            themeAndImage.uploadedImageData.id_anexo ||
            0;
        }

        if (imageId && imageId !== 0) {
          finalOrderObject.informacaoBolo.anexo = imageId;
          console.log('Usando imagem já enviada. ID:', imageId);
        }
      } else if (themeAndImage.selectedCarouselImage) {
        // Se é uma imagem do carrossel, usa o ID dela
        const imageId = themeAndImage.selectedCarouselImage.id_anexo;
        if (imageId && imageId !== 0) {
          finalOrderObject.informacaoBolo.anexo = imageId;
          console.log('Usando imagem do carrossel. ID:', imageId);
        }
      }

      console.log('Enviando pedido completo:', finalOrderObject);

      const response = await request.post('/pedidos/adicionarProduto', finalOrderObject);
      
      console.log('Resposta do servidor:', response);

      if(response.status == 201){
        console.log('Pedido enviado com sucesso!');
        navigate(ROUTES_PATHS.CART)
      }
      
      
      // Opcional: redirecionar para carrinho ou home após sucesso
      // navigate(ROUTES_PATHS.CART);
      
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Organiza dados para os componentes
  const cakeData = {
    ingredientSelection,
    themeAndImage,
    priceCalculator,
    observation,
    orderBuilder,
  };

  const imageData = {
    images,
    loading: imagesLoading,
    error: imagesError,
  };

  const stepConfig = {
    ...stepController,
    nextStep: handleNextStep,
    canAdvance: validateCurrentStep(),
  };

  // Mostra loading enquanto carrega dados iniciais
  if (dataLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Carregando ingredientes...
      </div>
    );
  }

  // Mostra erro se houve falha na API
  if (apiError) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        Erro: {apiError}
      </div>
    );
  }

  return (
    <OrderSummaryCakeView
      stepConfig={stepConfig}
      cakeData={cakeData}
      imageData={imageData}
      ingredients={ingredients}
      essentials={essentials}
      onSubmitOrder={handleSubmitOrder}
      isSubmitting={isSubmitting}
    />
  );
}
