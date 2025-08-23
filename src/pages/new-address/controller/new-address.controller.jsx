import { useState } from 'react';
import { NewAddressView } from '../view/new-address.view';
import { request } from '../../../utils/request';
import { getUserData } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

export function NewAddressController() {
  const navigate = useNavigate();

  // 1. Estado para guardar os valores de cada campo do formulário
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

  // 2. Estado para guardar as mensagens de erro de validação
  const [errors, setErrors] = useState({});

  // 3. Função para atualizar o estado quando o usuário digita em um campo
  function handleChange(field, value) {
    setFields(prev => ({ ...prev, [field]: value }));
  }

  // 4. Função que é chamada quando o formulário é enviado
  function handleSubmit(e) {
    e.preventDefault();
    
    // Futuramente, adicione a lógica de validação aqui
    // if (!validate()) return;

    const userData = getUserData();
    if (!userData) {
      alert("Erro: Usuário não encontrado. Faça o login novamente.");
      return;
    }

    // Monta o objeto para enviar ao backend
    const newAddressData = {
      ...fields,
      usuarioId: userData.id, // Adiciona o ID do usuário logado
      ativo: true,
    };

    console.log('Enviando para o backend:', newAddressData);
    
    // Exemplo de como seria a chamada à API
    request
      .post('/enderecos', newAddressData) // Verifique se a URL '/enderecos' está correta
      .then(response => {
        alert('Endereço cadastrado com sucesso!');
        // Redireciona de volta para a lista de endereços
        navigate(ROUTES_PATHS.ADDRESS_MENU);
      })
      .catch(error => {
        console.error("Erro ao cadastrar endereço:", error);
        alert("Não foi possível cadastrar o endereço. Tente novamente.");
      });
  }

  // 5. Renderiza a View, passando os estados e as funções necessárias
  return (
    <NewAddressView
      fields={fields}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}