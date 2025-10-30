import { useState } from 'react';
import { LoginView } from '../view/login.view';
import { request } from '../../../services/api';
import { saveUserData } from '../../../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import {
  validateFields,
  validators,
} from '../../../utils/field-validator/field-validator.utils';
import Swal from 'sweetalert2';

export function LoginController() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});

  // Pega a rota de origem para redirecionamento após login
  const from = location.state?.from || ROUTES_PATHS.HOME;

  function validate() {
    const loginValidators = {
      email: validators.email,
      password: validators.password,
    };
    const newErrors = validateFields(fields, loginValidators);
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(field, value) {
    setFields(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    const login = {
      email: fields.email,
      senha: fields.password,
    };

    e.preventDefault();
    if (!validate()) return;
    request
      .post('/usuarios/login', login)
      .then(response => {
        // armazenando a os dados do usuario do backend no localstorage
        const userData = response.data;
        if (response.status === 200) {
          let userRole = 'cliente';
          if (userData.tipo && userData.tipo.toLowerCase() === 'confeiteira') {
            userRole = 'confeiteira';
          }
          const normalizedUserData = {
            id: userData.id,
            nome: userData.nome,
            email: userData.email,
            telefone: userData.telefone,
            tipo: userData.tipo,
            logado: true,
            userRole: userRole,
          };

          saveUserData(normalizedUserData);
          saveUserData(userData);
          Swal.fire({
            icon: 'success',
            title: 'Login bem-sucedido',
            showConfirmButton: false,
            timer: 1500,
          });
          // Redireciona para a rota original ou home se não houver rota de origem
          navigate(from, { replace: true });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Falha no login',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao realizar login',
          showConfirmButton: false,
          timer: 1500,
        });
        console.error('Erro ao realizar login:', error);
      });
  }

  return (
    <LoginView
      fields={fields}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
