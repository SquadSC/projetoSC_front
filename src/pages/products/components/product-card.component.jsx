import * as React from 'react';
import { IconButton, Typography, Box, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// componente de cartão para exibir informações individuais de cada produto
export function ProductCard({
  name,      // nome do produto
  weight,    // peso em gramas
  price,     // preço do produto
  onEdit,    // função chamada ao clicar no botão de editar
  onDelete,  // função chamada ao clicar no botão de excluir
}) {
  return (
    // container principal do cartão com borda leve e sem elevação
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        mb: 2,
        '&:last-child': {
          mb: 0,
        },
        backgroundColor: price > 0 ? 'rgba(244, 225, 215, 0.2)' : 'white', // destaca itens premium/adicionais
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body1" component="h3" sx={{ fontWeight: 500, mb: 1 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Peso(g): {weight}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
            Preço: R$ {(price || 0).toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{ mr: 1 }}
            aria-label="editar produto"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={onDelete}
            color="error"
            aria-label="deletar produto"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
