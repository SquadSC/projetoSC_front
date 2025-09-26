import { useState, useEffect } from 'react';
import axios from 'axios';

export function useReferencesImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReferencesImages = async () => {
    setLoading(true);
    setError(null);

    try {
      // Usando json-server na porta 3001
      const response = await axios.get('http://localhost:3001/referencias');

      // Mapeia os dados do bdMock.json para o formato esperado
      const mappedImages = response.data.map(item => ({
        id_anexo: item.id_referencia,
        nome_arquivo: item.nome_referencia,
        imagem_anexo: item.imagem_referencia.startsWith('data:image/')
          ? item.imagem_referencia
          : `data:image/jpeg;base64,${item.imagem_referencia}`,
      }));

      setImages(mappedImages);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Erro ao buscar imagens de referência';
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
    refetch,
  };
}
