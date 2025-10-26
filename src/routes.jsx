import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTES_PATHS } from './utils/enums/routes-url';
import { NavigationProvider } from './hooks/use-navigation/navigation-provider.jsx';
import { HomeController } from './pages/home/index.page';
import { LoginController } from './pages/login/index.page.jsx';
import { RegisterUserController } from './pages/register-user/index.page';
import { ErrorGenericController } from './pages/error-generic/index.page.jsx';
import { CustomOrderController } from './pages/custom-order/index.page.jsx';
import { CartController } from './pages/cart/index.page.jsx';
import { CalendarUserController } from './pages/calendar-user/index.page.jsx';
import { ProfileController } from './pages/profile/index.page.jsx';


export default function AppRoutes() {
  const routes = [
    {
      path: ROUTES_PATHS.HOME,
      element: <HomeController />,
    },
    {
      path: ROUTES_PATHS.REGISTER_USER,
      element: <RegisterUserController />,
    },
    {
      path: ROUTES_PATHS.LOGIN,
      element: <LoginController />,
    },
    {
      path: ROUTES_PATHS.ERROR_GENERIC,
      element: <ErrorGenericController />,
    },
    {
      path: ROUTES_PATHS.CUSTOM_ORDER,
      element: <CustomOrderController />,
    },
    {
      path: ROUTES_PATHS.CART,
      element: <CartController />,
    },
    {
      path: ROUTES_PATHS.CALENDAR_USER,
      element: <CalendarUserController />,
    },
    {
      path: ROUTES_PATHS.PROFILE,
      element: <ProfileController />,
    }
  ];

  return (
    <Router>
      <NavigationProvider>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route
            path='*'
            element={<Navigate to={ROUTES_PATHS.HOME} replace />}
          />
        </Routes>
      </NavigationProvider>
    </Router>
  );
}
