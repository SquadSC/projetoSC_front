import * as React from 'react';
import { OrderDeliveryStageView } from '../view/order-delivery-stage.view';
import { request } from '../../../utils/request';
import { getUserData } from '../../../utils/auth';
import { fetchCep } from '../../../hooks/use-cep/cep-service';
import { useState, useEffect } from 'react';

export function OrderDeliveryStageController() {
  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);

  const [methodDelivery, setMethodDelivery] = useState('');
  const [addAddress, setAddAddress] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
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

  const handleNext = () => {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    if (nextStep > maxStepReached) {
      setMaxStepReached(nextStep);
    }
  };

  const driveMethodDelivery = method => {
    setMethodDelivery(method);
    if (method === 'delivery') {
      setAddAddress(true);
    } else {
      setAddAddress(false);
    }
  };

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
    <OrderDeliveryStageView
      stepConfig={{
        nextStep: handleNext,
        activeStep,
        maxStepReached,
        setActiveStep,
      }}
      methodDeliveryConfig={{
        methodDelivery,
        driveMethodDelivery,
        addAddress,
      }}
      addressConfig={{
        addresses,
        selectedAddressId,
        isAddingAddress,
        fields,
        errors,
        isCepLoading,
        onSelectAddress: handleSelectAddress,
        onAddNewAddress: handleAddNewAddress,
        onBackToAddressMenu: handleBackToAddressMenu,
        onChange: handleChange,
        onSubmit: handleSubmit,
      }}
    />
  );
}
