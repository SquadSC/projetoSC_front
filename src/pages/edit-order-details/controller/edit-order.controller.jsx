import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '../../../services/api'; // ajustar caminho se necessário
import EditOrderView from '../view/edit-order.view';

export default function EditOrderController() {
  const { id } = useParams(); // espera rota tipo /pedidos/:id/editar
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    request
      .get(`/pedidos/${id}`)
      .then((res) => {
        // adaptação: assegure que res.data tem dataEntrega e horaEntrega (strings compatíveis com <input type="date/time">)
        setOrder(res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar pedido:', err);
        setError('Não foi possível buscar os dados do pedido.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (payload) => {
    setSaving(true);
    setError(null);
    try {
      await request.put(`/pedidos/${id}`, payload);
      // navegar de volta ou mostrar mensagem
      navigate(-1);
    } catch (err) {
      console.error('Erro ao salvar pedido:', err);
      setError('Não foi possível salvar o pedido. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditOrderView
      loading={loading}
      saving={saving}
      error={error}
      order={order}
      onSave={handleSave}
      onCancel={() => navigate(-1)}
    />
  );
}
