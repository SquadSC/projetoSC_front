import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationContext } from './navigation-context';

const MAX_HISTORY = 5;

export function NavigationProvider({ children }) {
  const location = useLocation();

  // Recupera histórico do localStorage ou inicia vazio
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('nav_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Atualiza o histórico sempre que a rota mudar
  useEffect(() => {
    setHistory(prev => {
      if (prev[prev.length - 1] === location.pathname) return prev;

      const updated = [...prev, location.pathname];

      // Limita a MAX_HISTORY, remove a mais antiga se necessário
      if (updated.length > MAX_HISTORY) updated.shift();

      // Salva no localStorage
      localStorage.setItem('nav_history', JSON.stringify(updated));

      return updated;
    });
  }, [location]);

  // Funções de navegação
  const getPrevious = () =>
    history.length > 1 ? history[history.length - 2] : null;
  const pop = () => {
    setHistory(prev => {
      const updated = prev.slice(0, -1);
      localStorage.setItem('nav_history', JSON.stringify(updated));
      return updated;
    });
  };
  const goBack = (navigate, fallback = '/') => {
    const previous = getPrevious();
    if (previous) {
      pop();
      navigate(previous);
    } else {
      navigate(fallback);
    }
  };

  return (
    <NavigationContext.Provider value={{ history, getPrevious, pop, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
}
