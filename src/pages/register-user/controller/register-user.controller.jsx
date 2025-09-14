import { useState } from 'react';
import { RegisterUserView } from '../view/register-user.view';
import { request } from '../../../utils/request';
import { useNavigate } from 'react-router-dom';
import { validateFields, validators } from '../../../utils/field-validator/field-validator.utils';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

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
    const newErrors = validateFields(fields, validators);

    if (fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(validate)
    if (validate()) return;
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
        alert('Usuário registrado com sucesso!');
        navigate(ROUTES_PATHS.LOGIN);
      })
      .catch(error => {
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
