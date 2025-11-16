import * as React from 'react';
import { OrderDeliveryStageView } from '../view/order-delivery-stage.view';
import { request } from '../../../services/api';
import { getUserData } from '../../../utils/auth';
import { fetchCep } from '../../../hooks/use-cep/cep-service';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

export function OrderDeliveryStageController() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pedidoId = searchParams.get('pedidoId');

  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  
  const [addAddress, setAddAddress] = useState(false);

  const [methodDelivery, setMethodDelivery] = useState('');

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  // Persist calendar selections across navigation
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryHorario, setDeliveryHorario] = useState('');
  const [deliveryErrors, setDeliveryErrors] = useState({});
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
    if (method === true) {
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

  // Calendar handlers lifted to controller so selections persist
  function handleSetDate(d) {
    const date = d.format('YYYY-MM-DD')
    console.log(date)
    setDeliveryDate(d);
  }

  function handleSetHorario(h) {
    setDeliveryHorario(h);
  }

  // Função para montar a string de data e horário
  function getFormattedDateTime() {
    if (!deliveryDate || !deliveryHorario) return '';
    
    const dateStr = deliveryDate.format('DD/MM/YYYY');
    return `${dateStr} ${deliveryHorario}:00`;
  }

  function handleCalendarNext() {
    const newErrors = {};
    if (!deliveryDate) newErrors.date = 'Selecione uma data de entrega';
    if (!deliveryHorario) newErrors.horario = 'Selecione um horário de entrega';
    setDeliveryErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formattedDateTime = getFormattedDateTime();
      console.log('Data e horário formatados:', formattedDateTime);
      handleNext();
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
        Swal.fire({
          icon: 'success',
          title: 'Endereço cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });
        // Atualiza a lista a partir do servidor para garantir consistência
        const userId = userData.id;
        request
          .get(`/enderecos/usuario/${userId}`)
          .then(resp => setAddresses(resp.data))
          .catch(err => console.error('Erro ao atualizar endereços:', err));

        // Fecha a view de cadastro e seleciona o novo endereço (se disponível)
        setIsAddingAddress(false);
        const newId =
          response.data.idEndereco ??
          response.data.id ??
          response.data.id_endereco ??
          null;
        if (newId) setSelectedAddressId(newId);

        // Limpa formulário e erros
        setFields({
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
        setErrors({});
      })
      .catch(error => {
        console.error('Erro ao cadastrar endereço:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar endereço',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  // Verificar se existe pedidoId
  useEffect(() => {
    if (!pedidoId) {
      console.error('ID do pedido não encontrado');
      navigate(ROUTES_PATHS.CART);
      return;
    }
  }, [pedidoId, navigate]);

  // Função para finalizar o processo de entrega
  const handleFinishDelivery = async () => {
    try {
      // Validações baseadas no método de entrega
      if (methodDelivery === false && !selectedAddressId) {
        Swal.fire({
          icon: 'error',
          title: 'Endereço não selecionado',
          text: 'Por favor, selecione um endereço para entrega.',
        });
        return;
      }

      const deliveryData = {
        idPedido: parseInt(pedidoId),
        isRetirada: methodDelivery,
        dataEntregaEsperada: getFormattedDateTime(),
        enderecoId: methodDelivery === false ? selectedAddressId : null,
      };

      console.log('Finalizando entrega:', deliveryData);
      
      // Requisição para atualizar o pedido com os dados de entrega
      await request.patch(`/pedidos/enviarPedido`, deliveryData);

      const successMessage = methodDelivery === 'delivery' 
        ? 'Pedido finalizado! Será entregue no endereço selecionado.' 
        : 'Pedido finalizado! Aguarde contato para retirada no ateliê.';

      Swal.fire({
        icon: 'success',
        title: 'Pedido finalizado com sucesso!',
        text: successMessage,
        showConfirmButton: true,
        timer: 3000,
      });

      navigate(ROUTES_PATHS.HOME);
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao finalizar pedido',
        text: 'Tente novamente ou entre em contato conosco.',
      });
    }
  };

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
      }}
      calendarConfig={{
        date: deliveryDate,
        horario: deliveryHorario,
        errors: deliveryErrors,
        onDateChange: handleSetDate,
        onHorarioChange: handleSetHorario,
        onNext: handleCalendarNext,
        formattedDateTime: getFormattedDateTime(),
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
      onFinishDelivery={handleFinishDelivery}
      pedidoId={pedidoId}
    />
  );
}
