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
  backgroundColor: '#F7F2EC', // Mesma cor do fundo da página
  boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', // Sombra para destacar
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