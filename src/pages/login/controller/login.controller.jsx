import { useState } from "react";
import {LoginView} from "../view/login.view"
import {request} from '../../../utils/request';

export function LoginController(){
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
        password: fields.password
    }
    request.post('/login', login) 
    .then(response => {
        if (response.status === 200) {
          alert('Login bem-sucedido');
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

    return <LoginView 
     fields={fields}
     error={error} 
     onChange={handleChange} 
     onSubmit={handleSubmit} />;
}