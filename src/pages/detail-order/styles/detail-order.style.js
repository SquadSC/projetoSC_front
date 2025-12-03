const primaryColor = 'primary.main';

export const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  p: 1.7,
  borderBottom: '1px solid #E0E0E0',
  backgroundColor: 'secondary.main',
};

export const infoRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5, // Espaçamento entre o ícone e o texto
};

export const imageCarousel = {
  display: 'flex',
  gap: 2,
  overflowX: 'auto',
  paddingBottom: 1, // Espaço para a barra de rolagem não cortar a imagem
  '&::-webkit-scrollbar': {
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderRadius: '10px',
  },
};

export const bottomActions = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  gap: 2,
  padding: '16px',
  backgroundColor: 'background.default', // Mesma cor do fundo da página
  boxShadow: '0 -1px 6px rgba(41, 40, 40, 0.1)', // Sombra para destacar
  zIndex: 1000,
};

export const btnAccept = {
  flex: 1, // Ocupa metade do espaço disponível
  backgroundColor: primaryColor,
  color: 'white',
  borderRadius: '24px',
  padding: '10px 0',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#3E2723', // Um tom mais escuro para o hover
  },
};

export const btnDecline = {
  flex: 1, // Ocupa metade do espaço disponível
  borderColor: primaryColor,
  color: primaryColor,
  borderRadius: '24px',
  padding: '10px 0',
  fontWeight: 'bold',
};

// Estilos para o card do bolo
export const cakeCard = {
  backgroundColor: 'background.default',
  border: '2px solid',
  borderColor: 'primary.main',
  borderRadius: 2,
  mb: 2,
  boxShadow: 'none',
};

export const cakeCardHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
};

export const cakeCardTag = isPremium => ({
  background: isPremium
    ? 'linear-gradient(90deg, #CDA243 0%, #F3E4AA 50.48%, #C59736 100%)'
    : primaryColor,
  backgroundColor: isPremium ? undefined : primaryColor, // Fallback para navegadores antigos
  color: isPremium ? 'primary.main' : 'white',
  fontWeight: 'regular',
  fontSize: '0.75rem',
  height: '24px',
  borderRadius: '4px',
});

export const cakeCardContent = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const cakeCardRow = {
  display: 'flex',
  gap: 2,
  alignItems: 'flex-start',
};

export const btnViewDetails = {
  borderColor: primaryColor,
  color: primaryColor,
  borderRadius: '8px',
  padding: '8px 16px',
  fontWeight: 'bold',
  textTransform: 'none',
  mt: 1,
  '&:hover': {
    borderColor: primaryColor,
    backgroundColor: 'action.hover',
  },
};
