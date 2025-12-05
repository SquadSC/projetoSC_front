const primaryColor = 'primary.main';

// Estilos para o card de pedido do cliente
export const orderCard = {
  backgroundColor: 'background.paper',
  border: '2px solid',
  borderColor: 'primary.main',
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

// Estilos para botão "Ver Detalhes"
export const btnViewDetails = {
  width: '100%',
  borderColor: primaryColor,
  color: primaryColor,
  borderRadius: '24px',
  padding: '10px 0',
  fontWeight: 'bold',
  textTransform: 'none',
  mt: 2,
  '&:hover': {
    borderColor: primaryColor,
    backgroundColor: 'action.hover',
  },
};
