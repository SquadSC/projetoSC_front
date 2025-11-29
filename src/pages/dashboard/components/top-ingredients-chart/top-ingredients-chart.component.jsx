import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import theme from '../../../../theme';

const ingredientIcons = {
  'Chocolate': '🍫',
  'Morango': '🍓',
  'Baunilha': '🌟',
  'Doce de Leite': '🍯',
  'Coco': '🥥',
};

export function TopIngredientsChart({ data = [] }) {
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
            Top 5 Ingredientes
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            ✔ Fácil leitura • ✔ Ótimo para mobile • ✔ Ranking rápido
          </Typography>
        </Box>

        <Box>
          {data.map((ingredient, index) => (
            <Box
              key={ingredient.name}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
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
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: 'transparent',
                    fontSize: '1.2rem',
                  }}
                >
                  {ingredientIcons[ingredient.name] || '🧁'}
                </Avatar>
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
                    #{index + 1} {ingredient.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {ingredient.count} pedidos
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={`${ingredient.percentage}%`}
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
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
