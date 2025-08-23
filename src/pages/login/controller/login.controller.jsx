import { useState } from 'react';
import { LoginView } from '../view/login.view';
import { request } from '../../../utils/request';
import { saveUserData } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

export function LoginController() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});

  function validate() {
    const newErrors = {};
    if (!fields.email) newErrors.email = 'E-mail obrigatório';
    if (!fields.password) newErrors.password = 'Senha obrigatória';
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(field, value) {
    setFields(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Tentativa de login válida');
    const login = {
      email: fields.email,
      senha: fields.password,
    };
    request
      .post('/usuarios/login', login)
      .then(response => {
        // armazenando a os dados do usuario do backend no localstorage
        const userData = response.data
        if (response.status === 200) {
          saveUserData(userData)
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
    if (validate()) {
      // Perform login
    }
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
