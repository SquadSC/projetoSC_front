import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CakeDetailsClientView } from './cake-details-client.view';
import { api } from '../../../../services/api';

/**
 * Controller da tela de detalhes de um bolo específico para clientes
 * Gerencia a busca de dados do item e da imagem do anexo
 * Reutiliza a mesma lógica do CakeDetailsController da confeiteira
 */
export function CakeDetailsClientController() {
  const { idPedido, idItemPedido } = useParams();
  const location = useLocation();

  const [item, setItem] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageSrcRef = useRef(null);

  useEffect(() => {
    const fetchCakeDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Se o item foi passado via location.state, usa ele diretamente
        if (location.state?.item) {
          const itemData = location.state.item;
          setItem(itemData);

          // Buscar imagem do anexo se houver
          // O anexo pode vir como objeto completo ou apenas com idAnexo
          // Verifica diferentes formatos possíveis do anexo
          let anexoId = null;

          if (itemData.informacaoBolo?.anexo) {
            // Tenta diferentes formatos de ID
            anexoId =
              itemData.informacaoBolo.anexo.idAnexo ||
              itemData.informacaoBolo.anexo.id_anexo ||
              itemData.informacaoBolo.anexo.id;

            // Se o anexo tem imagemAnexo como base64 ou data URL, usa diretamente
            if (itemData.informacaoBolo.anexo.imagemAnexo && !anexoId) {
              // Se vier como base64 string
              if (
                typeof itemData.informacaoBolo.anexo.imagemAnexo === 'string'
              ) {
                if (
                  itemData.informacaoBolo.anexo.imagemAnexo.startsWith('data:')
                ) {
                  setImageSrc(itemData.informacaoBolo.anexo.imagemAnexo);
                } else {
                  // Assume que é base64
                  setImageSrc(
                    `data:image/jpeg;base64,${itemData.informacaoBolo.anexo.imagemAnexo}`,
                  );
                }
                setLoading(false);
                return;
              }
            }
          }

          // Se não encontrou anexoId, tenta fk_anexo direto no informacaoBolo
          if (!anexoId) {
            anexoId =
              itemData.informacaoBolo?.fk_anexo ||
              itemData.informacaoBolo?.fkAnexo;
          }

          if (anexoId) {
            try {
              const imageResponse = await api.get(`/anexos/${anexoId}`, {
                responseType: 'arraybuffer',
              });

              // Converter ArrayBuffer para Blob URL
              const blob = new Blob([imageResponse.data], {
                type: imageResponse.headers['content-type'] || 'image/jpeg',
              });
              const url = URL.createObjectURL(blob);
              // Revogar URL anterior se existir
              if (
                imageSrcRef.current &&
                imageSrcRef.current.startsWith('blob:')
              ) {
                URL.revokeObjectURL(imageSrcRef.current);
              }
              imageSrcRef.current = url;
              setImageSrc(url);
            } catch (imageErr) {
              console.warn('Erro ao buscar imagem do anexo:', imageErr);
              // Continua sem imagem
            }
          }

          setLoading(false);
          return;
        }

        // Caso contrário, busca o pedido completo e filtra o item
        if (idPedido && idItemPedido) {
          const response = await api.get(`/pedidos/${idPedido}`);
          const pedidoData = response.data;

          // Encontrar o item específico
          const itemEncontrado = pedidoData.itensPedido?.find(
            item => item.idItemPedido === parseInt(idItemPedido),
          );

          if (!itemEncontrado) {
            setError('Bolo não encontrado no pedido.');
            setLoading(false);
            return;
          }

          setItem(itemEncontrado);

          // Buscar imagem do anexo se houver
          // O anexo pode vir como objeto completo ou apenas com idAnexo
          let anexoId = null;

          if (itemEncontrado.informacaoBolo?.anexo) {
            // Tenta diferentes formatos de ID
            anexoId =
              itemEncontrado.informacaoBolo.anexo.idAnexo ||
              itemEncontrado.informacaoBolo.anexo.id_anexo ||
              itemEncontrado.informacaoBolo.anexo.id;

            // Se o anexo tem imagemAnexo como base64 ou data URL, usa diretamente
            if (itemEncontrado.informacaoBolo.anexo.imagemAnexo && !anexoId) {
              // Se vier como base64 string
              if (
                typeof itemEncontrado.informacaoBolo.anexo.imagemAnexo ===
                'string'
              ) {
                if (
                  itemEncontrado.informacaoBolo.anexo.imagemAnexo.startsWith(
                    'data:',
                  )
                ) {
                  setImageSrc(itemEncontrado.informacaoBolo.anexo.imagemAnexo);
                } else {
                  // Assume que é base64
                  setImageSrc(
                    `data:image/jpeg;base64,${itemEncontrado.informacaoBolo.anexo.imagemAnexo}`,
                  );
                }
                setLoading(false);
                return;
              }
            }
          }

          // Se não encontrou anexoId, tenta fk_anexo direto no informacaoBolo
          if (!anexoId) {
            anexoId =
              itemEncontrado.informacaoBolo?.fk_anexo ||
              itemEncontrado.informacaoBolo?.fkAnexo;
          }

          if (anexoId) {
            try {
              const imageResponse = await api.get(`/anexos/${anexoId}`, {
                responseType: 'arraybuffer',
              });

              // Converter ArrayBuffer para Blob URL
              const blob = new Blob([imageResponse.data], {
                type: imageResponse.headers['content-type'] || 'image/jpeg',
              });
              const url = URL.createObjectURL(blob);
              // Revogar URL anterior se existir
              if (
                imageSrcRef.current &&
                imageSrcRef.current.startsWith('blob:')
              ) {
                URL.revokeObjectURL(imageSrcRef.current);
              }
              imageSrcRef.current = url;
              setImageSrc(url);
            } catch (imageErr) {
              console.warn('Erro ao buscar imagem do anexo:', imageErr);
              // Continua sem imagem
            }
          }
        } else {
          setError('IDs do pedido ou item não fornecidos.');
        }
      } catch (err) {
        console.error('Erro ao buscar detalhes do bolo:', err);
        setError('Não foi possível carregar os detalhes do bolo.');
      } finally {
        setLoading(false);
      }
    };

    fetchCakeDetails();

    // Cleanup: revogar URL do blob quando componente desmontar
    return () => {
      if (imageSrcRef.current && imageSrcRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrcRef.current);
      }
    };
  }, [idPedido, idItemPedido, location.state]);

  return (
    <CakeDetailsClientView
      loading={loading}
      item={item}
      imageSrc={imageSrc}
      itemId={idItemPedido || location.state?.item?.idItemPedido}
      error={error}
    />
  );
}
