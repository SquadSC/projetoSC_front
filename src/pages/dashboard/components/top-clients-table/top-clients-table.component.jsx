import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import theme from '../../../../theme';

export function TopClientsTable({ data = [], showReturnRate = false, title = "Ranking de Clientes", subtitle }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card sx={{ height: '100%', width: '100%', minWidth: '100%', borderRadius: '8px', boxSizing: 'border-box' }}>
      <CardContent sx={{ p: 3, width: '100%', boxSizing: 'border-box' }}>
        <Box mb={3} display="flex" alignItems="center" gap={1}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mb: 0,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        <Box>
          {data.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: theme.palette.text.secondary,
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                Nenhum cliente encontrado
              </Typography>
              <Typography variant="caption">
                Dados serão atualizados automaticamente
              </Typography>
            </Box>
          ) : (
            data.map((client, index) => {
              return (
              <Box
                key={client.name}
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                mb={2}
                p={2}
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '8px',
                  backgroundColor: index === 0
                    ? theme.palette.primary.main + '10'
                    : theme.palette.grey[50],
                  border: index === 0
                    ? `1px solid ${theme.palette.primary.main}30`
                    : `1px solid ${theme.palette.grey[200]}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    backgroundColor: theme.palette.primary.main + '08',
                  },
                }}
              >
                <Box 
                  display="flex" 
                  alignItems="flex-start" 
                  gap={2}
                  sx={{
                    flex: 1,
                    minWidth: 0, // Permite que o conteúdo encolha
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0, // Permite que o texto encolha
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: index === 0 ? 'bold' : 'medium',
                        color: index === 0
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                        fontSize: '0.875rem',
                        wordBreak: 'break-word',
                        lineHeight: 1.4,
                      }}
                    >
                      {client.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {client.orders} pedidos
                      {client.email && ` • ${client.email}`}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={`${client.orders}`}
                  size="small"
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    backgroundColor: index === 0
                      ? theme.palette.primary.main
                      : theme.palette.grey[300],
                    color: index === 0
                      ? 'white'
                      : theme.palette.text.primary,
                    flexShrink: 0, // Não encolhe o chip
                    ml: 1,
                    mt: 0.5, // Alinha com o topo do texto quando quebra linha
                  }}
                />
              </Box>
            );
            })
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
