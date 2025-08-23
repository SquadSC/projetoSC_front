import { useState } from 'react';
import { AddressMenuView } from '../view/address-menu.view';
import { request } from '../../../utils/request';
import { useNavigate } from 'react-router-dom';

export function AddressMenuController() {
    const navigate = useNavigate();
      //guardar a lista de endereços
  const [addresses, setAddresses] = useState([]);
  
  //controlar o "carregando..."
  const [loading, setLoading] = useState(true);

  // Esta função será executada UMA VEZ, logo após o componente ser renderizado.
  useEffect(() => {
    // buscar os dados
    function fetchAddresses() {
      request
        .get('/enderecos/usuario/{}') // Faz a chamada GET para a sua API de endereços
        .then(response => {
          // att o estado com os dados
          setAddresses(response.data); 
        })
        .catch(error => {
          console.error('Erro ao buscar endereços:', error);
          alert('Não foi possível carregar os endereços.');
        })
        .finally(() => {
          // independentemente do resultado, para de mostrar o "carregando"
          setLoading(false);
        });
    }

    // Chamar a função de listagem
    fetchAddresses();
  }, []); // O array vazio [] no final significa: "execute isso apenas uma vez"

  function handleAddNewAddress() { // ir pra página de add endereço
  }

  // Se ainda estiver carregando, você pode mostrar uma mensagem
  if (loading) {
    return <p>Carregando endereços...</p>;
  }

  // 4. Passe a lista de endereços para a View
  return (
    <AddressMenuView
      addresses={addresses}
      onAddNewAddress={handleAddNewAddress}
    />
  );
}