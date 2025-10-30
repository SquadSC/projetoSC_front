import axios from 'axios';
import { getUserData } from '../utils/auth'; // Importa a função que pega dados do localStorage

// Configuração da instância do axios
const api = axios.create({
  // 1. MUDE A BASEURL para apontar para o seu back-end Spring
  baseURL: 'http://localhost:8080', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. ADICIONE O INTERCEPTOR de Requisição
// Isso "intercepta" toda requisição ANTES dela ser enviada
api.interceptors.request.use(
  (config) => {
    // Pega os dados do usuário (que contêm o token) do localStorage
    const userData = getUserData(); //

    // Se o usuário está logado e tem um token
    if (userData && userData.token) {
      // Adiciona o token no cabeçalho 'Authorization'
      config.headers['Authorization'] = `Bearer ${userData.token}`;
    }
    
    // Retorna a configuração modificada para o Axios continuar
    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  },
);

// (Opcional, mas bom para debug) Interceptor de Resposta
api.interceptors.response.use(
  response => response,
  error => {
    console.error("Erro na resposta da API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export { api };
export { api as request };