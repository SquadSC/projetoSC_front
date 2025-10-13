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
import { CartController } from './pages/cart/index.page.jsx';
import { OrderUserController } from './pages/order-user/index.page.jsx';
import { OrderDeliveryStageController } from './pages/order-delivery-stage/index.page.jsx';
import { OrderSummaryCakeController } from './pages/order-summary-cake/index.page.jsx';
import { NumberGuestsController } from './pages/number-guests/index.page.jsx';
import { OrdersController } from './pages/orders/controller/orders.controller.jsx';
import { PendingOrderController } from './pages/pending-order/controller/pending-order.controller.jsx';

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
      path: ROUTES_PATHS.CART,
      element: <CartController />,
    },
    {
      path: ROUTES_PATHS.ORDER_USER,
      element: <OrderUserController />,
    },
    {
      path: ROUTES_PATHS.ORDER_DELIVERY_STAGE,
      element: <OrderDeliveryStageController />,
    },
    {
      path: ROUTES_PATHS.ORDER_SUMMARY_CAKE,
      element: <OrderSummaryCakeController />,
    },
    {
      path: ROUTES_PATHS.NUMBER_GUESTS,
      element: <NumberGuestsController />,
    },
    {
      path: ROUTES_PATHS.ORDERS,
      element: < OrdersController/>,
    },
    {
      path: ROUTES_PATHS.PENDING_ORDERS,
      element: < PendingOrderController/>,
    },
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
