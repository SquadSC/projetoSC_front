import axios from 'axios';

// Configuração da instância do axios para comunicação com a API
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000, // timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições (pode ser usado para adicionar tokens, logs, etc.)
api.interceptors.request.use(
  config => {
    // Aqui você pode adicionar tokens de autenticação, logs, etc.
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`,
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Interceptor para respostas (pode ser usado para tratamento global de erros)
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Tratamento global de erros
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export { api };

// Exportação para compatibilidade com o código existente
export { api as request };
