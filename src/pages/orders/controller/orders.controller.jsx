import { useEffect, useState } from 'react';
import { OrdersView } from '../view/orders.view.jsx'; // Verifique o caminho correto para sua view
import mockData from '../../../../bdMock.json'; // Verifique o caminho correto para o seu mock

export function OrdersController() {
  const [pedidosPendentes, setPedidosPendentes] = useState([]);
  const [pedidosEmAndamento, setPedidosEmAndamento] = useState([]);

  useEffect(() => {
    // Simulando a busca de dados e adicionando status para a lógica da UI
    const pedidosComStatus = mockData.pedidos.map((pedido, index) => {
      if (index < 2) {
        return {
          ...pedido,
          id: `#1425${index + 6}`, // IDs de exemplo como na imagem
          tipo: index % 2 === 0 ? 'Híbrido' : 'Personalizado',
          status: 'Pendente',
          deliveryDate: `1${index + 6} Setembro, 2025`, // Datas de exemplo
          deliveryTime: '11:54 PM', // Horário de exemplo
        };
      } else {
        return {
          ...pedido,
          id: `#1425${index + 6}`,
          tipo: 'Híbrido',
          status: 'Em Andamento',
          fase:
            index === 2
              ? 'Confeiteira está verificando disponibilidade'
              : 'Preparando seu pedido',
          progresso: index === 2 ? 25 : 50, // Progresso em %
          deliveryDate: '16 Setembro, 2025',
          deliveryTime: '11:54 PM',
        };
      }
    });

    // Filtrando pedidos por status
    setPedidosPendentes(
      pedidosComStatus.filter((p) => p.status === 'Pendente')
    );
    setPedidosEmAndamento(
      pedidosComStatus.filter((p) => p.status === 'Em Andamento')
    );
  }, []);

  return (
    <OrdersView
      pedidosPendentes={pedidosPendentes}
      pedidosEmAndamento={pedidosEmAndamento}
    />
  );
}