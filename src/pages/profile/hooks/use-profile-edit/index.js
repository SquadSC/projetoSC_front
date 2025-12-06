import { useState, useEffect } from 'react';
import {
  validateFields,
  validators,
} from '../../../../utils/field-validator/field-validator.utils';

export function useProfileEdit(user) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [fields, setFields] = useState({
    nome: '',
    telefone: '',
  });
  const [errors, setErrors] = useState({});

  // Inicializar campos quando o usuário for carregado
  useEffect(() => {
    if (user) {
      setFields({
        nome: user.nome || '',
        telefone: user.telefone || '',
      });
    }
  }, [user]);

  const handleToggleEditMode = () => {
    if (isEditMode) {
      // Cancelar edição - restaurar valores originais
      setFields({
        nome: user?.nome || '',
        telefone: user?.telefone || '',
      });
      setErrors({});
    }
    setIsEditMode(!isEditMode);
  };

  const handleFieldChange = e => {
    const { name, value } = e.target;
    setFields(prev => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro do campo quando começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const fieldValidations = {
      nome: validators.name,
      telefone: [
        { check: v => !!v, msg: 'Telefone obrigatório' },
        {
          check: v => {
            // Remove formatação para validar apenas os números
            const numbersOnly = v.replace(/\D/g, '');
            return numbersOnly.length === 10 || numbersOnly.length === 11;
          },
          msg: 'Informe seu telefone com DDD',
        },
      ],
    };

    const validationErrors = validateFields(fields, fieldValidations);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const resetForm = () => {
    setFields({
      nome: user?.nome || '',
      telefone: user?.telefone || '',
    });
    setErrors({});
    setIsEditMode(false);
  };

  return {
    isEditMode,
    fields,
    errors,
    handleToggleEditMode,
    handleFieldChange,
    validateForm,
    resetForm,
    setErrors,
  };
}
