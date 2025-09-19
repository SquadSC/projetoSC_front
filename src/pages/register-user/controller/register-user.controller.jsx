import { useState } from 'react';
import { RegisterUserView } from '../view/register-user.view';
import { request } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import {
  validateFields,
  validators,
} from '../../../utils/field-validator/field-validator.utils';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import Swal from 'sweetalert2';

export function RegisterUserController() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setFields(prev => ({ ...prev, [field]: value }));
  }

  function validate() {
    const cadastroValidators = {
      name: validators.name,
      phone: validators.phone,
      email: validators.email,
      password: validators.password,
    };
    const newErrors = validateFields(fields, cadastroValidators);

    if (fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;
    const cleanPhone = fields.phone.replace(/\D/g, '');

    const user = {
      email: fields.email,
      senha: fields.password,
      nome: fields.name,
      telefone: cleanPhone,
      admin: false,
    };

    request
      .post('/usuarios', user)
      .then(response => {
        console.log('Usuário registrado com sucesso:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Usuário registrado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(ROUTES_PATHS.LOGIN);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao registrar usuário',
          showConfirmButton: false,
          timer: 1500,
        });
        console.error('Erro ao registrar usuário:', error);
      });
  }

  return (
    <RegisterUserView
      fields={fields}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
