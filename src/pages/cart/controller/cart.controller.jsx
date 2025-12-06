import { CartView } from '../view/cart.view';
import { request } from '../../../services/api';
import { useState, useEffect } from 'react';
import { getUserData } from '../../../utils/auth';

export function CartController() {
  const [produtos, setProdutos] = useState([]);

  const userData = getUserData();

  const fetchCartData = () => {
    request
      .get(`http://localhost:8080/pedidos/carrinho?idUsuario=${userData.id}`)
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  };

  const desabilitarItem = idDoItemPedido => {
    request
      .delete(
        `http://localhost:8080/pedidos/desabilitarItemPedido/${idDoItemPedido}`,
      )
      .then(() => {
        fetchCartData(); // Refresh cart data after deletion
      })
      .catch(error => {
        console.error('Error disabling item:', error);
      });
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return <CartView produtos={produtos} onDeleteItem={desabilitarItem} />;
}
