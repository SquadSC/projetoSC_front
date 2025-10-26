import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileView } from '../view/profile.view';
import { logout, getUserData, saveUserData } from '../../../utils/auth'; // Importa saveUserData
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import Swal from 'sweetalert2';
import {
  validateFields,
  validators,
} from '../../../utils/field-validator/field-validator.utils';

export function ProfileController() {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  // Estado para os dados de visualização (formatados)
  const [displayUser, setDisplayUser] = useState({});

  // Estado para os campos do formulário
  const [fields, setFields] = useState({
    nome: '',
    telefone: '',
    dataNascimento: '', // Formato YYYY-MM-DD
  });
  const [errors, setErrors] = useState({});

  // Formata data de DD/MM/YYYY (ou ISO) para YYYY-MM-DD
  const formatDateForInput = dateStr => {
    if (!dateStr) return '';
    try {
      if (dateStr.includes('/')) {
        const [day, month, year] = dateStr.split('/');
        if (day && month && year && year.length === 4) {
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
      }
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return '';
    } catch (e) {
      return '';
    }
  };

  // Formata data para visualização (DD/MM/YYYY)
  const formatDateForDisplay = dateStr => {
    if (!dateStr) return 'Não informado';
    // Se já estiver em YYYY-MM-DD (do input)
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    // Se estiver em ISO ou outro formato
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  // Carrega os dados do usuário no início
  useEffect(() => {
    const data = getUserData() || {};

    // Mock de dados (baseado no seu controller anterior)
    const mockData = {
      nome: data.nome || 'César Ruiz de Souza',
      email: data.email || 'ruiz.cesar@gmail.com',
      telefone: data.telefone || '(11) 99673-3647',
      memberSince: data.createdAt || '2024-03-15',
      dataNascimento: data.dataNascimento || '2006-01-29',
      totalPedidos: data.totalPedidos || 12,
    };

    // Define os dados de visualização
    setDisplayUser({
      ...mockData,
      dataNascimentoDisplay: formatDateForDisplay(mockData.dataNascimento),
      memberSinceDisplay: formatDateForDisplay(mockData.memberSince),
    });

    // Define os dados dos campos de edição
    setFields({
      nome: mockData.nome,
      telefone: mockData.telefone,
      dataNascimento: formatDateForInput(mockData.dataNascimento),
    });
  }, []);

  // Alterna o modo de edição
  const handleToggleEditMode = () => {
    // Se estiver saindo do modo de edição (cancelando), redefina os campos
    if (isEditMode) {
      const data = getUserData() || {};
      const mockData = {
        nome: data.nome || 'César Ruiz de Souza',
        telefone: data.telefone || '(11) 99673-3647',
        dataNascimento: data.dataNascimento || '2006-01-29',
      };
      setFields({
        nome: mockData.nome,
        telefone: mockData.telefone,
        dataNascimento: formatDateForInput(mockData.dataNascimento),
      });
      setErrors({}); // Limpa os erros
    }
    setIsEditMode(prev => !prev);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Deseja realmente sair?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sair',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#38090D',
      cancelButtonColor: '#6c757d',
    }).then(result => {
      if (result.isConfirmed) {
        logout();
        navigate(ROUTES_PATHS.LOGIN);
      }
    });
  };

  // --- Funções de Edição ---

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const profileValidators = {
      nome: validators.name,
      telefone: validators.phone,
    };
    const newErrors = validateFields(fields, profileValidators);

    if (!fields.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // Sem backend: Apenas simulamos o salvamento
      console.log('Salvando dados:', fields);

      // Atualiza os dados no localStorage (simulação de persistência)
      const data = getUserData();
      const newData = {
        ...data,
        nome: fields.nome,
        telefone: fields.telefone,
        dataNascimento: fields.dataNascimento, // Salva no formato YYYY-MM-DD
      };
      saveUserData(newData);

      // Atualiza os dados de visualização
      setDisplayUser({
        ...displayUser, // Mantém email, pedidos, etc.
        nome: fields.nome,
        telefone: fields.telefone,
        dataNascimentoDisplay: formatDateForDisplay(fields.dataNascimento),
      });

      Swal.fire({
        icon: 'success',
        title: 'Dados salvos com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Sai do modo de edição
      setIsEditMode(false);
    }
  };

  return (
    <ProfileView
      user={displayUser}
      isEditMode={isEditMode}
      fields={fields}
      errors={errors}
      onToggleEditMode={handleToggleEditMode}
      onLogout={handleLogout}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}