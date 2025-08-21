import { useState } from 'react';
import { RegisterUserView } from '../view/register-user.view';
import {request} from '../../../utils/request';

export function RegisterUserController() {
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
    const newErrors = {};
    if (!fields.name) newErrors.name = 'Nome obrigatório';
    if (!fields.phone) newErrors.phone = 'Telefone obrigatório';
    if (!fields.email) newErrors.email = 'E-mail obrigatório';
    if (!fields.password) newErrors.password = 'Senha obrigatória';
    if (fields.password !== fields.confirmPassword)
      newErrors.confirmPassword = 'Senhas não coincidem';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    alert('Usuário válido!');
    const user = {
      "email": fields.email,
      "senha": fields.password,
      "nome": fields.name,
      "telefone": fields.phone,
      "admin": false
    };
    request.post('/usuarios', user)
      .then(response => {
        console.log('Usuário registrado com sucesso:', response.data);
        alert('Usuário registrado com sucesso!');
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
