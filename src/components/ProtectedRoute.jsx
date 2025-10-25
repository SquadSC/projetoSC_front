import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES_PATHS } from '../utils/enums/routes-url';
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
      <Container backgroundColor='white' sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size="5rem" color='primary.main' />
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
