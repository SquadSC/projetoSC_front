export const ROUTES_PATHS = {
  // Rotas públicas
  LOGIN: '/login-user',
  REGISTER_USER: '/register-user',
  ERROR_GENERIC: '/error-generic',

  // Rotas confeiteira
  HOME_CONFECTIONER: '/home-confectioner',
  EDIT_ORDER: '/edit-order-details',
  PRODUCTS: '/products',
  EDIT_PRODUCT: '/products/edit/:id',
  ADD_PRODUCT: '/add-product',
  DASHBOARD: '/dashboard',
  PENDING_ORDERS: '/pending-orders',
  PENDING_ORDER_SELECTED: '/pending-order-selected/:id', 
  
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
