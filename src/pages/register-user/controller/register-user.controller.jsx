import { useState } from 'react';
import { RegisterUserView } from '../view/register-user.view';
import { request } from '../../../utils/request';

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

    const validators = {
      name: [
        { check: v => !!v, msg: 'Nome obrigatório' },
        { check: v => /^[a-zA-Z\s]+$/.test(v), msg: 'Nome inválido' },
        { check: v => v.length <= 45, msg: 'Nome muito longo' },
      ],
      phone: [
        { check: v => !!v, msg: 'Telefone obrigatório' },
        { check: v => v.length >= 15, msg: 'Informe seu telefone com DDD' },
      ],
      email: [
        { check: v => !!v, msg: 'E-mail obrigatório' },
        {
          check: v => v.length >= 10,
          msg: 'E-mail deve conter no mínimo 10 caracteres',
        },
        { check: v => v.length <= 150, msg: 'E-mail muito longo' },
      ],
      password: [
        { check: v => !!v, msg: 'Senha obrigatória' },
        {
          check: v => v.length >= 8,
          msg: 'Senha deve conter no mínimo 8 caracteres',
        },
        { check: v => v.length <= 60, msg: 'Senha muito longa' },
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

    if (fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    alert('Usuário válido!');

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
