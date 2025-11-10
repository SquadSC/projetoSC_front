import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth/use-auth';
import { useUserRole } from '../../hooks/use-user-role/use-user-role';
import { ROUTES_PATHS } from '../../utils/enums/routes-url';
import { CircularProgress, Container } from '@mui/material';

/**
 * Componente para proteger rotas que requerem autenticação
 * Redireciona usuários não autenticados para a tela de login
 * Preserva a rota de origem para redirecionamento após login
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mostra um loading enquanto verifica a autenticação
  if (loading) {
    return (
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size='5rem' color='primary.main' />
      </Container>
    );
  }

  // Se não estiver autenticado, redireciona para login preservando a rota atual
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES_PATHS.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Se autenticado, renderiza o componente filho
  return children;
}

/**
 * Componente para proteger rotas exclusivas de CLIENTES
 * Redireciona confeiteiras para sua área
 */
export function ProtectedCustomerRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const { isConfectioner } = useUserRole();
  const location = useLocation();

  // Loading
  if (loading) {
    return (
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size='5rem' color='primary' />
      </Container>
    );
  }

  // Se não está logado, vai para login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES_PATHS.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Se é confeiteira tentando acessar área de cliente, redireciona para área da confeiteira
  if (isConfectioner) {
    return <Navigate to={ROUTES_PATHS.HOME_CONFECTIONER} replace />;
  }

  // Se é cliente, permite acesso
  return children;
}

/**
 * Componente para proteger rotas exclusivas de CONFEITEIRAS
 * Redireciona clientes para sua área
 */
export function ProtectedConfectionerRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const { isClient } = useUserRole();
  const location = useLocation();

  // Loading
  if (loading) {
    return (
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size='5rem' color='primary' />
      </Container>
    );
  }

  // Se não está logado, vai para login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES_PATHS.LOGIN}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Se é cliente tentando acessar área de confeiteira, redireciona para área do cliente
  if (isClient) {
    return <Navigate to={ROUTES_PATHS.HOME} replace />;
  }

  // Se é confeiteira, permite acesso
  return children;
}
