import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from '@mui/material';
import theme from '../../../../theme';

export function TopClientsTable({ data = [] }) {
  const getAvatarColor = (index) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ];
    return colors[index] || theme.palette.grey[500];
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box mb={3}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            Top Clientes (Recorrência)
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Clientes com mais pedidos no período
          </Typography>
        </Box>

        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Cliente
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Pedidos
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((client, index) => (
                <TableRow
                  key={client.name}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.grey[50],
                    },
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: getAvatarColor(index),
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {getInitials(client.name)}
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: index === 0 ? 'bold' : 'medium',
                          color: index === 0
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                        }}
                      >
                        {client.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={client.orders}
                      size="small"
                      sx={{
                        backgroundColor: index === 0
                          ? theme.palette.primary.main + '20'
                          : theme.palette.grey[100],
                        color: index === 0
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                        fontWeight: 'bold',
                        minWidth: '40px',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
