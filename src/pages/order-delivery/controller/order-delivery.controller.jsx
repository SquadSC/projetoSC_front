import { OrderDeliveryView } from '../view/order-delivery.view';
import { useState, useEffect } from 'react';
import { request } from '../../../utils/request';
import { getUserData } from '../../../utils/auth';
import { fetchCep } from '../../../hooks/use-cep/cep-service';

export function OrderDeliveryController() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false); // Controla se está na tela de adicionar endereço
  const [fields, setFields] = useState({
    nomeEndereco: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pontoReferencia: '',
  });
  const [errors, setErrors] = useState({});
  const [isCepLoading, setIsCepLoading] = useState(false);

  // Carregar endereços do usuário
  useEffect(() => {
    const userData = getUserData();
    if (!userData || !userData.id) return;

    request
      .get(`/enderecos/usuario/${userData.id}`)
      .then(response => setAddresses(response.data))
      .catch(err => console.error('Erro ao buscar endereços:', err));
  }, []);

  // Selecionar endereço
  function handleSelectAddress(id) {
    setSelectedAddressId(id);
  }

  // Alternar para a tela de adicionar endereço
  function handleAddNewAddress() {
    setIsAddingAddress(true);
  }

  // Voltar para o menu de endereços
  function handleBackToAddressMenu() {
    setIsAddingAddress(false);
  }

  // Atualizar campos do formulário
  async function handleChange(field, value) {
    setFields(prev => ({ ...prev, [field]: value }));

    if (field === 'cep') {
      const cleanedCep = value.replace(/\D/g, '');
      if (cleanedCep.length === 8) {
        setIsCepLoading(true);
        try {
          const addressData = await fetchCep(cleanedCep);
          setFields(prev => ({
            ...prev,
            cep: cleanedCep,
            logradouro: addressData.logradouro,
            bairro: addressData.bairro,
            cidade: addressData.localidade,
            estado: addressData.uf,
          }));
        } catch (error) {
          setErrors(prev => ({ ...prev, cep: error.message }));
        } finally {
          setIsCepLoading(false);
        }
      }
    }
  }

  function validate() {
    const newErrors = {};
    if (!fields.nomeEndereco) newErrors.nomeEndereco = 'Nome obrigatório';
    if (!fields.cep) newErrors.cep = 'CEP obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Submeter novo endereço
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const userData = getUserData();
    if (!userData) {
      alert('Erro: Usuário não encontrado. Faça o login novamente.');
      return;
    }

    const newAddressData = {
      ...fields,
      usuarioId: userData.id,
      ativo: true,
    };

    request
      .post('/enderecos', newAddressData)
      .then(response => {
        alert('Endereço cadastrado com sucesso!');
        setAddresses(prev => [...prev, response.data]);
        setIsAddingAddress(false);
      })
      .catch(error => {
        console.error('Erro ao cadastrar endereço:', error);
        alert('Não foi possível cadastrar o endereço. Tente novamente.');
      });
  }

  return (
    <OrderDeliveryView
      addresses={addresses}
      selectedAddressId={selectedAddressId}
      isAddingAddress={isAddingAddress}
      fields={fields}
      errors={errors}
      isCepLoading={isCepLoading}
      onSelectAddress={handleSelectAddress}
      onAddNewAddress={handleAddNewAddress}
      onBackToAddressMenu={handleBackToAddressMenu}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
