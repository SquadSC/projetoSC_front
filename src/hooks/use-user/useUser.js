import { useState, useEffect } from 'react';

/**
 * Hook para gerenciar dados do usuário do localStorage
 */
export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        // Busca pela chave correta: 'userData'
        const userData = localStorage.getItem('userData');

        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();

    // Listener para mudanças no localStorage (caso o usuário faça login/logout em outra aba)
    const handleStorageChange = e => {
      if (e.key === 'userData') {
        loadUserFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Função para obter o ID do usuário
  const getUserId = () => {
    return user?.id || 0;
  };

  // Função para verificar se o usuário está logado
  const isAuthenticated = () => {
    return user && user.logado === true;
  };

  // Função para obter dados específicos do usuário
  const getUserData = () => {
    return {
      id: user?.id || 0,
      nome: user?.nome || '',
      email: user?.email || '',
      telefone: user?.telefone || '',
      tipo: user?.tipo || '',
      logado: user?.logado || false,
    };
  };

  return {
    user,
    isLoading,
    getUserId,
    isAuthenticated,
    getUserData,
  };
};
