import { useContext } from 'react';
import { NavigationContext } from './navigation-context';

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  const goBack = (navigate, fallback = '/') => {
    const previous = context.getPrevious();
    if (previous) {
      context.pop();
      navigate(previous);
    } else {
      navigate(fallback);
    }
  };

  return { ...context, goBack };
};
