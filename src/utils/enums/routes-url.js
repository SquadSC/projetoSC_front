export const ROUTES_PATHS = {
  // Rotas públicas
  LOGIN: '/login-user',
  REGISTER_USER: '/register-user',
  ERROR_GENERIC: '/error-generic',

  // Rotas confeiteira
  HOME_CONFECTIONER: '/home-confectioner',
  AGENDA: '/agenda',
  EDIT_ORDER: '/edit-order-details',
  PRODUCTS: '/products',
  EDIT_PRODUCT: '/products/edit/:id',
  ADD_PRODUCT: '/add-product',
  DASHBOARD: '/dashboard',
  PENDING_ORDERS: '/pending-orders',
  PENDING_ORDER_SELECTED: '/pending-order-selected/:id',
  CAKE_DETAILS: '/pending-order-selected/:idPedido/cake/:idItemPedido',
  CAKE_DETAILS_CLIENT: '/detail-order/:idPedido/cake/:idItemPedido',

  // Rotas cliente
  HOME: '/',
  CART: '/cart',
  ORDER_DELIVERY_STAGE: '/order-delivery-stage',
  ORDER_SUMMARY_CAKE: '/order-summary-cake',
  DETAIL_ORDER: '/detail-order',
  NUMBER_GUESTS: '/number-guests',
  ORDERS: '/orders',
  // PENDING_ORDERS:'/pending-orders',
};
