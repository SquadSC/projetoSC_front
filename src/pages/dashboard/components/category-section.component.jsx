import { Box, Typography } from '@mui/material';
import { HorizontalBar } from './horizontal-bar.component';

export function CategorySection({ title, items }) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Título da seção (ex: "Decorações", "Recheios", "Adicionais") */}
      <Typography
        variant='h6'                              // Tamanho de fonte grande
        sx={{
          fontWeight: 'bold',                    // Texto em negrito
          color: '#38090D',                      // Cor marrom da marca
          mb: 2,                                 // Margem inferior
        }}
      >
        {title}
      </Typography>
      
      {/* Lista de produtos - mapeia cada item do array */}
      {items.map((item, index) => (
        <HorizontalBar
          key={index}                            // Chave única para cada item (necessário no React)
          name={item.name}                       // Nome do produto
          quantity={item.quantity}               // Quantidade vendida
          trend={item.trend}                    // Tendência em percentual
          isPositive={item.isPositive}           // Se a tendência é positiva
        />
      ))}
    </Box>
  );
}
