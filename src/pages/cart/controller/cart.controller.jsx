import { CartView } from '../view/cart.view';
import { request } from '../../../services/api';
import { useState, useEffect } from 'react';
import {getUserData} from '../../../utils/auth'

export function CartController() {
  const [produtos, setProdutos] = useState([]);

  const userData = getUserData();
  useEffect(() => {
    request
      .get(`http://localhost:8080/pedidos/carrinho?idUsuario=${userData.id}`)
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  console.log(produtos)
  return <CartView produtos={produtos} />;
}
