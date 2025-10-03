import { CartView } from '../view/cart.view';
import { request } from '../../../services/api';
import { useState, useEffect } from 'react';

export function CartController() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    request
      .get('http://localhost:3001/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  return <CartView produtos={produtos} />;
}
