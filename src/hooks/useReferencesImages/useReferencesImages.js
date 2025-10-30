import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

/**
 * Hook para buscar imagens de referência do backend
 * Faz 8 requisições paralelas aos endpoints /anexos/{id} e converte ByteArrays para URLs utilizáveis
 * @returns {Object} Estado do hook com images, loading, errors, etc.
 */
export function useReferencesImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);

  const abortControllerRef = useRef(null);
  const objectUrlsRef = useRef(new Set());

  // Função para converter ArrayBuffer para Base64
  const arrayBufferToBase64 = useCallback(buffer => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }, []);

  // Abordagem A - Blob URL (recomendada para performance)
  const createBlobUrl = useCallback((arrayBuffer, contentType) => {
    const blob = new Blob([arrayBuffer], { type: contentType });
    const url = URL.createObjectURL(blob);
    objectUrlsRef.current.add(url);
    return { url, size: blob.size };
  }, []);

  // Abordagem B - Base64 Data URL
  const createDataUrl = useCallback(
    (arrayBuffer, contentType) => {
      const base64 = arrayBufferToBase64(arrayBuffer);
      const dataUrl = `data:${contentType};base64,${base64}`;
      return { url: dataUrl, size: arrayBuffer.byteLength };
    },
    [arrayBufferToBase64],
  );

  // Abordagem C - URL direta (fallback para blob)
  const createDirectUrl = useCallback(
    (arrayBuffer, contentType) => {
      // Como o backend retorna ByteArray, não temos URL direta
      // Fazemos fallback para Blob URL
      return createBlobUrl(arrayBuffer, contentType);
    },
    [createBlobUrl],
  );

  // Função para processar uma imagem individual
  const fetchSingleImage = useCallback(
    async (id, signal, approach = 'blob') => {
      try {
        const response = await axios.get(`http://localhost:8080/anexos/${id}`, {
          responseType: 'arraybuffer', // Importante para receber ByteArray
          timeout: 8000,
          signal,
          headers: {
            Accept: 'image/*',
          },
        });

        // Verificar se foi cancelado
        if (signal.aborted) {
          return null;
        }

        // Validar Content-Type
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
          throw new Error(`Content-Type inválido: ${contentType}`);
        }

        // Escolher abordagem de conversão
        let imageData;
        switch (approach) {
          case 'blob':
            imageData = createBlobUrl(response.data, contentType);
            break;
          case 'base64':
            imageData = createDataUrl(response.data, contentType);
            break;
          case 'direct':
            imageData = createDirectUrl(response.data, contentType);
            break;
          default:
            imageData = createBlobUrl(response.data, contentType);
        }

        return {
          id_anexo: id,
          nome_arquivo: `referencia_${id}`,
          imagem_anexo: imageData.url,
          contentType,
          size: imageData.size,
          approach,
          status: 'success',
          error: null,
        };
      } catch (error) {
        // Não logar erros de cancelamento
        if (error.name === 'AbortError' || signal.aborted) {
          return null;
        }

        // Categorizar tipos de erro
        let errorType = 'Erro desconhecido';
        let status = 'error';

        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorType = 'ID inválido';
              status = 'placeholder';
              break;
            case 404:
              errorType = 'Não encontrada';
              status = 'placeholder';
              break;
            case 500:
            case 502:
            case 503:
              errorType = 'Erro do servidor';
              break;
            default:
              errorType = `HTTP ${error.response.status}`;
          }
        } else if (
          error.code === 'ECONNABORTED' ||
          error.message.includes('timeout')
        ) {
          errorType = 'Timeout';
        } else if (error.message.includes('Content-Type')) {
          errorType = 'Tipo inválido';
        }

        // Retornar placeholder mantendo a posição no array
        return {
          id_anexo: id,
          nome_arquivo: `placeholder_${id}`,
          imagem_anexo: null,
          contentType: null,
          size: 0,
          approach,
          status,
          error: errorType,
        };
      }
    },
    [createBlobUrl, createDataUrl, createDirectUrl],
  );

  // Função principal para buscar todas as imagens
  const fetchReferencesImages = useCallback(
    async (approach = 'blob') => {
      setLoading(true);
      setErrors({});
      setGlobalError(null);

      // Cancelar requisições anteriores
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Limpar URLs de objeto anteriores para evitar vazamentos de memória
      objectUrlsRef.current.forEach(url => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          // Ignorar erros de cleanup
        }
      });
      objectUrlsRef.current.clear();

      // Criar novo AbortController
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        // Array de IDs para buscar (1 a 8)
        const imageIds = [1, 2, 3, 4, 5, 6, 7, 8];

        // Executar todas as requisições em paralelo
        const imagePromises = imageIds.map(id =>
          fetchSingleImage(id, abortController.signal, approach),
        );

        const results = await Promise.all(imagePromises);

        // Verificar se foi cancelado durante o processamento
        if (abortController.signal.aborted) {
          return;
        }

        // Filtrar resultados cancelados
        const validResults = results.filter(result => result !== null);

        // Separar sucessos e erros
        const successes = validResults.filter(
          result => result.status === 'success',
        );
        const failures = validResults.filter(
          result => result.status !== 'success',
        );

        // Consolidar erros por tipo para estatísticas
        const errorsByType = failures.reduce((acc, failure) => {
          const errorType = failure.error || 'Desconhecido';
          acc[errorType] = (acc[errorType] || 0) + 1;
          return acc;
        }, {});

        if (failures.length > 0) {
          console.log(`⚠️ Tipos de falhas:`, errorsByType);
        }

        setImages(validResults);
        setErrors(errorsByType);

        // Se todas falharam, definir erro global
        if (successes.length === 0 && failures.length > 0) {
          setGlobalError('Nenhuma imagem de referência pôde ser carregada');
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          const errorMessage =
            error.message || 'Erro ao buscar imagens de referência';
          setGlobalError(errorMessage);
          console.error('❌ Erro geral ao buscar imagens:', error);

          // Criar array de placeholders para manter estrutura
          const placeholders = Array.from({ length: 8 }, (_, index) => ({
            id_anexo: index + 1,
            nome_arquivo: `placeholder_${index + 1}`,
            imagem_anexo: null,
            contentType: null,
            size: 0,
            approach,
            status: 'error',
            error: 'Falha na conexão',
          }));

          setImages(placeholders);
          setErrors({ 'Falha na conexão': 8 });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [fetchSingleImage],
  );

  // Função de cleanup
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    objectUrlsRef.current.forEach(url => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        // Ignorar erros de cleanup
      }
    });
    objectUrlsRef.current.clear();
  }, []);

  // Effect principal - executar na montagem do componente
  useEffect(() => {
    fetchReferencesImages('blob'); // Usar abordagem blob por padrão

    // Cleanup ao desmontar componente
    return cleanup;
  }, [fetchReferencesImages, cleanup]);

  // Função para recarregar com abordagem específica
  const refetch = useCallback(
    (approach = 'blob') => {
      fetchReferencesImages(approach);
    },
    [fetchReferencesImages],
  );

  // Função para alternar entre abordagens
  const switchApproach = useCallback(
    approach => {
      cleanup(); // Limpar recursos da abordagem anterior
      fetchReferencesImages(approach);
    },
    [fetchReferencesImages, cleanup],
  );

  return {
    // Estado principal
    images, // Array de objetos com informações das imagens
    loading, // Boolean indicando se está carregando
    errors, // Object com erros agrupados por tipo
    globalError, // String com erro geral se houver

    // Funções
    refetch, // Função para recarregar (approach opcional)
    switchApproach, // Função para alternar abordagem de conversão
    cleanup, // Função para limpeza manual de recursos

    // Estatísticas (compatibilidade e debug)
    stats: {
      total: images.length,
      success: images.filter(img => img.status === 'success').length,
      errors: images.filter(img => img.status === 'error').length,
      placeholders: images.filter(img => img.status === 'placeholder').length,
    },
  };
}
