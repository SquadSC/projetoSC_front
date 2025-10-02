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

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }
  };

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

  const combinedImages = userUploadedImage
    ? [userUploadedImage, ...images]
    : images;

  const refImages = {
    images: combinedImages,
    loading,
    error,
    refetch,
    userUploadedImage,
    selectedReferenceImage,
    setSelectedReferenceImage: handleImageSelection,
  };

  return (
    <OrderSummaryCakeView
      stepConfig={stepConfig}
      infoCake={infoCake}
      refImages={refImages}
    />
  );
}
