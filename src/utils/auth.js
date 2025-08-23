const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

// salvar os dados no localStorage após o login
export function saveAuthData(token, userData) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

// pegar os dados do usuário
export function getUserData() {
  const userDataString = localStorage.getItem(USER_DATA_KEY);
  if (!userDataString) return null;
  return JSON.parse(userDataString);
}

// pegar apenas o token
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// limpar os dados no logout
export function clearAuthData() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
}