import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useReferencesImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReferencesImages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Usando sua instância do axios configurada
      const response = await api.get('/anexo/referencias');
      
      // Mapeia os dados para o formato esperado
      const mappedImages = response.data.map(item => ({
        id_anexo: item.id_anexo,
        nome_arquivo: item.nome_arquivo,
        imagem_anexo: item.imagem_anexo.startsWith('data:image/') 
          ? item.imagem_anexo 
          : `data:image/jpeg;base64,${item.imagem_anexo}`
      }));
      
      setImages(mappedImages);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar imagens de referência';
      setError(errorMessage);
      console.error('Erro ao buscar imagens de referência:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferencesImages();
  }, []);

  // Função para recarregar as imagens manualmente
  const refetch = () => {
    fetchReferencesImages();
  };

  return {
    images,
    loading,
    error,
    refetch
  };
}