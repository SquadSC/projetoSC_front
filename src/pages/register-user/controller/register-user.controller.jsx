import { useState } from 'react';
import { RegisterUserView } from '../view/register-user.view';

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
