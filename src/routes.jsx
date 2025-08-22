import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTES_PATHS } from './utils/enums/routes-url';
import { HomeController } from './pages/home/index.page';
import { RegisterUserController } from './pages/register-user/index.page';
import { LoginController } from './pages/login/controller/login.controller.jsx';

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
    }
  ];

  return (
    <Router>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path='*' element={<Navigate to={ROUTES_PATHS.HOME} replace />} />
      </Routes>
    </Router>
  );
}
