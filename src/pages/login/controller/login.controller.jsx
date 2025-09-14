import { useState } from 'react';
import { LoginView } from '../view/login.view';
import { request } from '../../../utils/request';
import { saveUserData } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import {
  validateFields,
  validators,
} from '../../../utils/field-validator/field-validator.utils';

export function LoginController() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});

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
          saveUserData(userData);
          alert('Login bem-sucedido');
          // Redireciona o usuário para a página principal
          navigate(ROUTES_PATHS.HOME);
        } else {
          alert('Falha no login');
        }
      })
      .catch(error => {
        alert(error.message);
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
