const USER_DATA_KEY = 'userData';

export function saveUserData(userData) {
  // guarda o objeto do usuário como texto.
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

// Recupera os dados do usuário do localStorage.
export function getUserData() {
  const userDataString = localStorage.getItem(USER_DATA_KEY);
  if (!userDataString) {
    return null;
  }
  return JSON.parse(userDataString);
}

// Remove os dados do usuário do localStorage
export function logout() {
  localStorage.removeItem(USER_DATA_KEY);
}

// Verifica se o usuário está atualmente logado -  proteger rotas e exibir conteúdo condicional-
export function isLoggedIn() {
  const userData = getUserData();

  // Retorna false se não houver dados de usuário salvos
  if (!userData) {
    return false;
  }

  // Retorna o valor da propriedade 'logado' (true ou false)
  return userData.logado === true;
}