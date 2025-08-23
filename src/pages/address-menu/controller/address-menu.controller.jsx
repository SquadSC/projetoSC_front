import { useState, useEffect } from 'react';
import { AddressMenuView } from '../view/address-menu.view';
import { request } from '../../../utils/request';
import { getUserData } from '../../../utils/auth';

export function AddressMenuController() {
    const navigate = useNavigate();
      //guardar a lista de endereços
  const [addresses, setAddresses] = useState([]);
  
  //controlar o "carregando..."
  const [loading, setLoading] = useState(true);

  // Esta função será executada logo após o componente ser renderizado.
  useEffect(() => {
    // tenta pegar os dados do usuário.
    const userData = getUserData();

    // Se não houver usuário, não fazemos a chamada à API.
    if (!userData || !userData.id) {
      setLoading(false);
      return;
    }

    // Se encontrou um usuário, prossegue com a busca de endereços.
    const usuarioId = userData.id;

    request
      .get(`/usuarios/${usuarioId}/enderecos`)
      .then(response => {
        setAddresses(response.data);
      })
      .catch(err => {
        console.error('Erro ao buscar endereços:', err);
        setError('Ocorreu um erro ao buscar seus endereços.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // O array vazio [] garante que isso só rode uma vez.


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