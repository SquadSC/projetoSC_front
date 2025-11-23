import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTES_PATHS } from './utils/enums/routes-url';
import { NavigationProvider } from './hooks/use-navigation/navigation-provider.jsx';
import {
  ProtectedCustomerRoute,
  ProtectedConfectionerRoute,
} from './components/protected-custumer/protected-custumer.jsx';
import { HomeController } from './pages/home/index.page';
import { LoginController } from './pages/login/index.page.jsx';
import { RegisterUserController } from './pages/register-user/index.page';
import { ErrorGenericController } from './pages/error-generic/index.page.jsx';
import { CartController } from './pages/cart/index.page.jsx';
import { OrderDeliveryStageController } from './pages/order-delivery-stage/index.page.jsx';
import { OrderSummaryCakeController } from './pages/order-summary-cake/index.page.jsx';
import { NumberGuestsController } from './pages/number-guests/index.page.jsx';
import { ProductsController } from './pages/products/index.page.jsx';
import { AddProductController } from './pages/add-product/index.page.jsx';
import { EditProductController } from './pages/edit-product/index.page.jsx';
import { DashboardController } from './pages/dashboard/index.page.jsx';
import { OrdersController } from './pages/orders/controller/orders.controller.jsx';
import { PendingOrderController } from './pages/pending-order/controller/pending-order.controller.jsx';
import { PendingOrderSelectedController } from './pages/pending-order-selected/controller/pending-order-selected.controller.jsx';
import { CakeDetailsController } from './pages/pending-order-selected/components/cake-details/cake-details.controller';
import { HomeConfectionerController } from './pages/home-confectioner/index.page.jsx';
import { DetailOrderController } from './pages/detail-order/index.page.jsx';

// ========================================
// CONFIGURAÇÃO CENTRALIZADA DE ROTAS
// ========================================

export const CLIENT_ROUTES_PATHS = [
  ROUTES_PATHS.HOME,
  ROUTES_PATHS.CART,
  ROUTES_PATHS.ORDERS,
  ROUTES_PATHS.DETAIL_ORDER,
  ROUTES_PATHS.ORDER_DELIVERY_STAGE,
  ROUTES_PATHS.ORDER_SUMMARY_CAKE,
  ROUTES_PATHS.NUMBER_GUESTS,
];

export const CONFECTIONER_ROUTES_PATHS = [
  ROUTES_PATHS.HOME_CONFECTIONER,
  ROUTES_PATHS.PRODUCTS,
  ROUTES_PATHS.ADD_PRODUCT,
  ROUTES_PATHS.EDIT_PRODUCT,
  ROUTES_PATHS.DASHBOARD,
  ROUTES_PATHS.ORDERS,
  ROUTES_PATHS.PENDING_ORDERS,
  ROUTES_PATHS.PENDING_ORDER_SELECTED,
  ROUTES_PATHS.CAKE_DETAILS,
];

export const routeHelpers = {
  canUserAccessRoute: (userRole, routePath) => {
    if (userRole === 'confeiteira') {
      return CONFECTIONER_ROUTES_PATHS.includes(routePath);
    } else {
      return CLIENT_ROUTES_PATHS.includes(routePath);
    }
  },

  getDefaultHomeRoute: userRole => {
    return userRole === 'confeiteira'
      ? ROUTES_PATHS.HOME_CONFECTIONER
      : ROUTES_PATHS.HOME;
  },

  getRedirectPath: (userRole, from) => {
    if (!from) {
      return routeHelpers.getDefaultHomeRoute(userRole);
    }

    if (routeHelpers.canUserAccessRoute(userRole, from)) {
      return from;
    }

    return routeHelpers.getDefaultHomeRoute(userRole);
  },
};

export default function AppRoutes() {
  const publicRoutes = [
    {
      path: ROUTES_PATHS.LOGIN,
      element: <LoginController />,
    },
    {
      path: ROUTES_PATHS.REGISTER_USER,
      element: <RegisterUserController />,
    },
    {
      path: ROUTES_PATHS.ERROR_GENERIC,
      element: <ErrorGenericController />,
    },
  ];

  // Rotas exclusivas para CLIENTES
  const customerRoutes = [
    {
      path: ROUTES_PATHS.HOME,
      element: <HomeController />,
    },
    {
      path: ROUTES_PATHS.CART,
      element: <CartController />,
    },
    {
      path: ROUTES_PATHS.ORDERS,
      element: <OrdersController />,
    },
    {
      path: ROUTES_PATHS.DETAIL_ORDER + '/:id',
      element: <DetailOrderController />,
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
  ];

  // Rotas exclusivas para CONFEITEIRAS
  const confectionerRoutes = [
    {
      path: ROUTES_PATHS.HOME_CONFECTIONER,
      element: <HomeConfectionerController />,
    },
    {
      path: ROUTES_PATHS.PRODUCTS,
      element: <ProductsController />,
    },
    {
      path: ROUTES_PATHS.ADD_PRODUCT,
      element: <AddProductController />,
    },
    {
      path: ROUTES_PATHS.EDIT_PRODUCT,
      element: <EditProductController />,
    },
    {
      path: ROUTES_PATHS.DASHBOARD,
      element: <DashboardController />,
    },
    {
      path: ROUTES_PATHS.ORDERS,
      element: <OrdersController />,
    },
    {
      path: ROUTES_PATHS.PENDING_ORDERS,
      element: <PendingOrderController />,
    },
    {
      path: ROUTES_PATHS.PENDING_ORDER_SELECTED,
      element: <PendingOrderSelectedController />,
    },
    {
      path: ROUTES_PATHS.CAKE_DETAILS,
      element: <CakeDetailsController />,
    },
  ];

  return (
    <Router>
      <NavigationProvider>
        <Routes>
          {/* Rotas públicas */}
          {publicRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* Rotas protegidas para CLIENTES */}
          {customerRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedCustomerRoute>{route.element}</ProtectedCustomerRoute>
              }
            />
          ))}

          {/* Rotas protegidas para CONFEITEIRAS */}
          {confectionerRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedConfectionerRoute>
                  {route.element}
                </ProtectedConfectionerRoute>
              }
            />
          ))}

          {/* Rota padrão - redireciona para login */}
          <Route
            path='*'
            element={<Navigate to={ROUTES_PATHS.LOGIN} replace />}
          />
        </Routes>
      </NavigationProvider>
    </Router>
  );
}
