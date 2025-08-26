import { useState } from 'react';
import { NewAddressView } from '../view/new-address.view';
import { request } from '../../../utils/request';
import { getUserData } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { fetchCep } from '../../../services/cep-service';

export function NewAddressController() {
  const navigate = useNavigate();
  const [isCepLoading, setIsCepLoading] = useState(false);


  // guardar os valores de cada campo do formulário
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
    usuarioId: '',
    ativo: ''
  });

  // guardar as mensagens de erro de validação
  const [errors, setErrors] = useState({});

  // atualizar o estado quando o usuário digita em um campo
  async function handleChange(field, value) {
    setFields(prev => ({ ...prev, [field]: value }));

    if (field === 'cep') {
      const cleanedCep = value.replace(/\D/g, ''); // envia o cep sem o '-' da máscara
      if (cleanedCep.length === 8) {
        setIsCepLoading(true); // Ativa o loading
        try {
          const addressData = await fetchCep(cleanedCep);
          // Preenche os campos com os dados da API
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
          setIsCepLoading(false); // Desativa o loading
        }
      }
    }
  }

  function validate() {
    const newErrors = {};

    const validators = {
      nomeEndereco: [
        { check: v => !!v, msg: 'Nome obrigatório' },
        { check: v => /^[a-zA-Z\s]+$/.test(v), msg: 'Nome inválido' },
        { check: v => v.length <= 50, msg: 'Nome muito longo' },
      ],
      cep: [
        { check: v => !!v, msg: 'CEP obrigatório' },
        { check: v => v.length >= 8, msg: 'Informe seu CEP' },
      ],
      logradouro: [
        { check: v => !!v, msg: 'Logradouro obrigatório' },
        {
          check: v => v.length >= 4,
          msg: 'Logradouro obrigatório',
        },
        { check: v => v.length <= 100, msg: 'Logradouro muito longo' },
      ],
      bairro: [
        { check: v => !!v, msg: 'Bairro obrigatório' },
        {
          check: v => v.length >= 4,
          msg: 'Bairro deve conter no mínimo 4 caracteres',
        },
        { check: v => v.length <= 60, msg: 'Bairro muito longo' },
      ],
    };

    for (const field in validators) {
      const value = fields[field];
      for (const { check, msg } of validators[field]) {
        if (!check(value)) {
          newErrors[field] = msg;
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!validate()) return;

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
    
    request
      .post('/enderecos', newAddressData)
      .then(response => {
        alert('Endereço cadastrado com sucesso!');
        navigate(ROUTES_PATHS.ADDRESS_MENU);
      })
      .catch(error => {
        console.error("Erro ao cadastrar endereço:", error);
        alert("Não foi possível cadastrar o endereço. Tente novamente.");
      });
  }

  return (
    <NewAddressView
      fields={fields}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isCepLoading={isCepLoading} 
    />
  );
}