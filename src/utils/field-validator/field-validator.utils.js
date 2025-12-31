export const validators = {
  name: [
    { check: v => !!v, msg: 'Nome obrigatório' },
    { check: v => /^[a-zA-Z\s]+$/.test(v), msg: 'Nome inválido' },
    { check: v => v.length <= 45, msg: 'Nome muito longo' },
  ],
  phone: [
    { check: v => !!v, msg: 'Telefone obrigatório' },
    { check: v => /^\d+$/.test(v), msg: 'Telefone deve conter apenas números' },
    { check: v => v.length === 11, msg: 'Telefone deve ter 11 dígitos (DDD + número)' },
    { check: v => /^[1-9]{2}9/.test(v), msg: 'Número de celular deve começar com 9 após o DDD' },
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
  address: [
    { check: v => !!v, msg: 'Endereço obrigatório' },
    {
      check: v => v.street && v.street.trim().length > 2,
      msg: 'Rua obrigatória',
    },
    {
      check: v => v.number && String(v.number).trim().length > 0,
      msg: 'Número obrigatório',
    },
    {
      check: v => v.neighborhood && v.neighborhood.trim().length > 2,
      msg: 'Bairro obrigatório',
    },
    {
      check: v => v.city && v.city.trim().length > 2,
      msg: 'Cidade obrigatória',
    },
    { check: v => /^[0-9]{5}-?[0-9]{3}$/.test(v.cep), msg: 'CEP inválido' },
  ],
};

export function validateFields(fields, validators) {
  const errors = {};

  for (const field in validators) {
    const value = fields[field];
    for (const { check, msg } of validators[field]) {
      if (!check(value)) {
        errors[field] = msg;
        break;
      }
    }
  }

  return errors;
}
