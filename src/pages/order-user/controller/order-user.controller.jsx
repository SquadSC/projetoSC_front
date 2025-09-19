import { OrderUserView } from '../view/order-user.view';

export function OrderUserController() {
  var pedidos = [];

  pedidos = [
    {
      idPedido: 1,
      tipoPedido: 'Bolo de Aniversário',
      dataPedido: '2023-10-15',
      horarioPedido: '14:00',
      status: 2,
    },
    {
      idPedido: 2,
      tipoPedido: 'Bolo de Aniversário',
      dataPedido: '2023-10-15',
      horarioPedido: '14:00',
      status: 2,
    },
    {
      idPedido: 3,
      tipoPedido: 'Bolo de Aniversário',
      dataPedido: '2023-10-15',
      horarioPedido: '14:00',
      status: 2,
    },
  ];

  return (
    <>
      <OrderUserView pedidos={pedidos} />
    </>
  );
}
