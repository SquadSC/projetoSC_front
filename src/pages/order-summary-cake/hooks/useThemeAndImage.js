import { useState, useCallback, useRef } from 'react';
import { api } from '../../../services/api';

/**
 * Hook para gerenciar tema e imagens (carrossel + upload)
 */
export function useThemeAndImage() {
  const [theme, setTheme] = useState('');

  // Estados para upload de imagem
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageData, setUploadedImageData] = useState(null); // Dados da imagem após upload

  // Estados para imagem do carrossel
  const [selectedCarouselImage, setSelectedCarouselImage] = useState(null);

  const [errors, setErrors] = useState({
    theme: '',
    image: '',
  });

  const fileInputRef = useRef(null);

  // Função para fazer upload da imagem para o backend
  const uploadImageToBackend = useCallback(async file => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/anexos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; // Retorna os dados da imagem (ID, URL, etc.)
    } catch (error) {
      throw new Error('Falha ao fazer upload da imagem');
    }
  }, []);

  // Determina qual imagem está selecionada (upload tem prioridade)
  const selectedImage = uploadedFile
    ? {
        source: 'upload',
        data: uploadPreview,
        file: uploadedFile,
      }
    : selectedCarouselImage
    ? {
        source: 'carousel',
        data: selectedCarouselImage,
      }
    : null;

  // Manipula seleção de tema
  const handleThemeChange = useCallback(newTheme => {
    setTheme(newTheme);
    setErrors(prev => ({ ...prev, theme: '' }));
  }, []);

  // Manipula upload de arquivo
  const handleFileUpload = useCallback(
    async event => {
      const file = event.target.files[0];

      if (!file) return;

      // Validações
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Apenas arquivos de imagem são permitidos.',
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setErrors(prev => ({
          ...prev,
          image: 'A imagem deve ter no máximo 5MB.',
        }));
        return;
      }

      setUploading(true);
      setErrors(prev => ({ ...prev, image: '' }));

      try {
        // Cria preview local primeiro
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            // Faz o upload para o backend
            const uploadResponse = await uploadImageToBackend(file);

            // Salva os dados após upload bem-sucedido
            setUploadedFile(file);
            setUploadPreview(reader.result);
            setUploadedImageData(uploadResponse);

            // Limpa seleção do carrossel quando faz upload
            setSelectedCarouselImage(null);

            console.log('Upload realizado com sucesso:', uploadResponse);
          } catch (uploadError) {
            setErrors(prev => ({
              ...prev,
              image: 'Erro ao fazer upload da imagem. Tente novamente.',
            }));
            console.error('Erro no upload:', uploadError);
          } finally {
            setUploading(false);
          }
        };

        reader.onerror = () => {
          setErrors(prev => ({
            ...prev,
            image: 'Erro ao processar a imagem.',
          }));
          setUploading(false);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          image: 'Erro inesperado ao processar a imagem.',
        }));
        setUploading(false);
        console.error('Erro inesperado:', error);
      }
    },
    [uploadImageToBackend],
  );

  // Manipula seleção de imagem do carrossel
  const handleCarouselImageSelect = useCallback(
    imageRef => {
      if (selectedCarouselImage?.id_anexo === imageRef.id_anexo) {
        // Deseleciona se já estava selecionada
        setSelectedCarouselImage(null);
      } else {
        // Seleciona nova imagem
        setSelectedCarouselImage(imageRef);

        // Limpa upload quando seleciona do carrossel
        setUploadedFile(null);
        setUploadPreview(null);
      }

      setErrors(prev => ({ ...prev, image: '' }));
    },
    [selectedCarouselImage],
  );

  // Remove imagem selecionada
  const removeImage = useCallback(() => {
    setUploadedFile(null);
    setUploadPreview(null);
    setUploadedImageData(null);
    setSelectedCarouselImage(null);
    setErrors(prev => ({ ...prev, image: '' }));

    // Limpa o input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Abre seletor de arquivo
  const openFileSelector = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Validação
  const isValid = theme.trim().length > 0 || selectedImage !== null;

  // Obtém dados para envio
  const getSubmissionData = useCallback(() => {
    let attachmentId = 0;
    let attachment = null;

    if (selectedImage?.source === 'carousel') {
      // Imagem do carrossel
      attachmentId = selectedImage.data.id_anexo || 0;
      attachment = selectedImage.data.imagem_anexo;
    } else if (selectedImage?.source === 'upload' && uploadedImageData) {
      // Imagem uploadada - usa o ID retornado pelo backend
      // Se uploadedImageData é um número (como 7), usa diretamente
      // Se é um objeto, tenta extrair o ID
      if (typeof uploadedImageData === 'number') {
        attachmentId = uploadedImageData;
      } else {
        attachmentId =
          uploadedImageData.id ||
          uploadedImageData.id_anexo ||
          uploadedImageData ||
          0;
      }
      attachment = uploadedImageData.url || uploadedImageData.caminho || null;
    }

    return {
      theme: theme.trim(),
      attachment,
      attachmentId,
      uploadedImageData, // Inclui dados completos do upload se disponível
    };
  }, [theme, selectedImage, uploadedImageData]);

  // Limpa todos os dados
  const clearAll = useCallback(() => {
    setTheme('');
    setUploadedFile(null);
    setUploadPreview(null);
    setUploadedImageData(null);
    setSelectedCarouselImage(null);
    setErrors({ theme: '', image: '' });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return {
    // Estados
    theme,
    uploadedFile,
    uploadPreview,
    uploadedImageData,
    uploading,
    selectedCarouselImage,
    selectedImage,
    errors,
    isValid,

    // Refs
    fileInputRef,

    // Funções
    handleThemeChange,
    handleFileUpload,
    handleCarouselImageSelect,
    removeImage,
    openFileSelector,
    getSubmissionData,
    clearAll,
    uploadImageToBackend,
  };
}
