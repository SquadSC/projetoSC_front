export const profileContainer = {
    backgroundColor: 'background.default',
    minHeight: 'calc(100vh - 150px)',
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: '90px',
};

// --- Avatar ---

// Container que envolve o Avatar e o ícone de edição
export const avatarContainer = {
    position: 'relative',
    mb: 2,
};

// Estilo do componente Avatar do MUI
export const avatarStyle = {
    width: 120,
    height: 120,
    bgcolor: 'grey.300',
    mb: 2,
};

// Estilo do ícone de edição sobre o Avatar
export const editIconStyle = {
    position: 'absolute',
    bottom: 20, // Ajustado para ficar sobre o avatar
    right: 0,
    bgcolor: 'primary.main',
    color: 'white',
    width: 32,
    height: 32,
    '&:hover': {
        bgcolor: 'primary.dark',
    },
    cursor: 'pointer',
    '&:hover': {
        bgcolor: 'primary.dark',
    },
};

// --- Modo de Visualização ---
export const infoSection = {
    width: '100%',
    maxWidth: '400px',
    mt: 4,
};

export const infoRow = {
    mb: 3,
};

// --- Modo de Edição ---
export const formStyle = {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    mt: 4,
};