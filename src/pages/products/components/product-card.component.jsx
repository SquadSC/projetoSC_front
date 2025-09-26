import * as React from 'react';
import { IconButton, Typography, Box, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// componente de cartão para exibir informações individuais de cada produto
export function ProductCard({
  name, // nome do produto
  weight, // peso em gramas
  price, // preço do produto
  onEdit, // função chamada ao clicar no botão de editar
  onDelete, // função chamada ao clicar no botão de excluir
}) {
  return (
    // container principal do cartão com borda leve e sem elevação
    <Paper
      elevation={0}
      sx={{
        py: 2,
        px: 1,
        border: '1.25px solid #38090D',
        borderRadius: '4px',
        mb: 2,
        '&:last-child': {
          mb: 0,
        },
        backgroundColor: '#FFF5F5',
        // backgroundColor: price > 0 ? 'rgba(244, 225, 215, 0.2)' : 'white', // destaca itens premium/adicionais
      }}
    >
      {/* todo o conteudo dentro da box */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'flex-start',
          color: 'primary.main',
          // backgroundColor: 'pink',
        }}
      >
        {/* topo: nome do produto e botoes de editar/excluir */}
        <Box
          sx={{
            // backgroundColor: 'yellow',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* lado esquerdo: descricao dos produtos */}
          <Typography variant='body1' component='h3' sx={{ fontWeight: 500 }}>
            {name}
          </Typography>

          {/* lado direito: botoes de editar e excluir */}
          <Box sx={{display: 'flex', flexDirection: 'row', }}>
            <IconButton
              size='small'
              onClick={onEdit}
              sx={{ mr: 0 }}
              aria-label='editar produto'
            >
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={onDelete}
              color='error'
              aria-label='deletar produto'
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>

        <Box // linha divisória
          sx={{
            width: '98%',
            height: '1px',
            backgroundColor: '#38090D',
            my: 0.5,
            mx: 'auto',
          }}
        />
        <Box // alinhando a chave e o valor nas pontas
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '98%',
          }}
        >
          <Typography variant='body1' component='h3' sx={{ fontWeight: 500 }}>
            Peso(g):
          </Typography>

          <Typography variant='body1' component='h3' sx={{ fontWeight: 500 }}>
            {weight}500
          </Typography>
        </Box>
        <Box // linha divisória
          sx={{
            width: '98%',
            height: '1px',
            backgroundColor: '#38090D',
            my: 1,
            mx: 'auto',
          }}
        />
         <Box // alinhando a chave e o valor nas pontas
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '98%',
          }}
        >
         <Typography variant='body1' component='h3' sx={{ fontWeight: 500 }}>
          Preço: 
        </Typography>
          <Typography variant='body1' component='h3' sx={{ fontWeight: 500 }}>
            R$ {(price || 0).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
