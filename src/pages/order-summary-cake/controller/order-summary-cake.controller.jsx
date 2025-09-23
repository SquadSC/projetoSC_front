import { useState } from 'react';
import { OrderSummaryCakeView } from '../view/order-summary-cake.view';
import { useReferencesImages } from '../../../hooks/useReferencesImages/useReferencesImages';

export function OrderSummaryCakeController() {
  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [product, setProduct] = useState({
    idProduct: '',
    price: '',
    quantity: '',
    theme: '',
    observation: '',
    attachment: '',
    ingredientList: [
      {
        name: '',
        type: '',
        isPremium: false,
      },
    ],
  });
  const [errors, setErrors] = useState({
    idProduct: '',
    price: '',
    quantity: '',
    theme: '',
    observation: '',
    attachment: '',
    ingredientList: [
      {
        name: '',
        type: '',
        isPremium: false,
      },
    ],
  });

  const { images, loading, error, refetch } = useReferencesImages();

  // Estados para upload de imagem
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }
  };

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
      setPreview(base64String); // preview da imagem

      // Salva no product (você pode salvar com ou sem o prefixo data:image)
      setProduct(prev => ({ ...prev, attachment: base64String }));

      // Limpa erros
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

    reader.readAsDataURL(selectedFile); // lê como base64
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setProduct(prev => ({ ...prev, attachment: '' }));
    setErrors(prev => ({ ...prev, attachment: '' }));
  };

  const stepConfig = {
    nextStep: handleNext,
    activeStep,
    maxStepReached,
    setActiveStep,
  };

  const infoCake = {
    product,
    setProduct,
    errors,
    setErrors,
    // Adicionando as funções de upload
    file,
    preview,
    uploading,
    handleFileChange,
    removeImage,
  };

  return <OrderSummaryCakeView stepConfig={stepConfig} infoCake={infoCake} />;
}
