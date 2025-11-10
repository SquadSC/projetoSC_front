const primaryColor = 'primary.main';

// Estilos para o card de pedido pendente
export const orderCard = {
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  mb: 2,
  boxShadow: 'none',
};

export const orderCardHeader = {
  mb: 1,
};

export const orderCardStatus = {
  fontWeight: 'medium',
  mb: 1,
};

export const orderCardDetail = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2,
};

// Estilos para a barra de progresso
export const progressBarContainer = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
  width: '100%',
};

export const progressStep = (isActive, hasConnector) => {
  return {
    flex: 1,
    height: '8px',
    backgroundColor: isActive ? primaryColor : 'action.disabledBackground',
    borderRadius: '4px',
    ...(hasConnector && {
      marginRight: '8px',
    }),
  };
};

// Estilos para botões
export const btnViewDetails = {
  flex: 1,
  borderColor: primaryColor,
  color: primaryColor,
  borderRadius: '24px',
  padding: '10px 0',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    borderColor: primaryColor,
    backgroundColor: 'action.hover',
  },
};

export const btnAdvance = {
  flex: 1,
  backgroundColor: primaryColor,
  color: 'white',
  borderRadius: '24px',
  padding: '10px 0',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#3E2723',
  },
  '&:disabled': {
    backgroundColor: 'action.disabledBackground',
    color: 'action.disabled',
  },
};

// Estilos para o header com bordas na seta
export const headerContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  p: 2,
  borderBottom: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

export const backButton = {
  position: 'absolute',
  left: 8,
  borderTop: '1px solid',
  borderLeft: '1px solid',
  borderColor: 'divider',
  borderRadius: '4px 0 0 0',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};
