import { getUserData, isLoggedIn } from '../../utils/auth';

/**
 * Hook simples para gerenciar roles de usuário
 * Mantém compatibilidade com o sistema existente
 */
export function useUserRole() {
  const userData = getUserData();
  const authenticated = isLoggedIn();

  // Se não está logado, retorna null
  if (!authenticated || !userData) {
    return {
      userRole: null,
      isClient: false,
      isConfectioner: false,
      isAuthenticated: false,
    };
  }

  // Determina o tipo de usuário
  const userType = userData.tipo?.toLowerCase();
  const isConfectioner = userType === 'confeiteira';
  const isClient = !isConfectioner;

  return {
    userRole: isConfectioner ? 'confeiteira' : 'cliente',
    isClient,
    isConfectioner,
    isAuthenticated: authenticated,
    userData,
  };
}
