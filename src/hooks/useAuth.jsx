import { useState, useEffect } from 'react';
import { getUserData, isLoggedIn, logout as authLogout } from '../utils/auth';

/**
 * Hook customizado para gerenciar o estado de autenticação
 * Centraliza a verificação de autenticação e fornece funcionalidades relacionadas
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verifica o estado de autenticação ao montar o componente
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Função para verificar o status atual de autenticação
  const checkAuthStatus = () => {
    try {
      const userData = getUserData();
      const authenticated = isLoggedIn();

      setUser(userData);
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const logout = () => {
    try {
      authLogout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Função para atualizar o estado do usuário após login
  const updateAuthStatus = () => {
    checkAuthStatus();
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout,
    updateAuthStatus,
  };
}
