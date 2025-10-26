import { CartView } from '../view/cart.view';
import { request } from '../../../services/api';
import { useState, useEffect } from 'react';

export function CartController() {
  const [produtos, setProdutos] = useState([]);

  const idUsuario = localStorage.getItem('userData').id;
  useEffect(() => {
    request
      .get(`http://localhost:8080/pedidos/carrinho?idUsuario=${idUsuario}`)
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  return <CartView produtos={produtos} />;
}
