import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import theme from '../../../../theme';

export function TopClientsTable({ data = [], showReturnRate = false, title = "Top Clientes" }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box mb={3} display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              backgroundColor: 'transparent',
              fontSize: '1rem',
            }}
          >
            👥
          </Avatar>
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
            data.map((client, index) => (
              <Box
                key={client.name}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width={'80vw'}
                mb={2}
                p={2}
                sx={{
                  borderRadius: '12px',
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
                <Box display="flex" alignItems="center" gap={2}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: index === 0 ? 'bold' : 'medium',
                        color: index === 0
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
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
                    backgroundColor: index === 0
                      ? theme.palette.primary.main
                      : theme.palette.grey[300],
                    color: index === 0
                      ? 'white'
                      : theme.palette.text.primary,
                  }}
                />
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
