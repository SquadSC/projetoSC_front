import * as React from 'react';
import { IconButton, Typography, Box, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';

// componente de cartão para exibir informações individuais de cada produto
export function ProductCard({
  name, // nome do produto
  weight, // peso em gramas ou quantidade
  price, // preço do produto
  onEdit, // função chamada ao clicar no botão de editar
  onDelete, // função chamada ao clicar no botão de excluir
  isIngredient, // se é ingrediente ou produto
  unidadeMedida, // 'kg' ou 'unidade'
  ativo,
  is_premium,
}) {
  return (
    // container principal do cartão com borda leve e sem elevação
    <Paper
      elevation={0}
      sx={{
        py: 2,
        px: 1,
        border: is_premium ? '2px solid #CDA243' : ativo ? '2px solid #38090D' : '2px solid #666666',
        borderRadius: '4px',
        mb: 2,
        backgroundColor: ativo ? 'background.default' : '#E0E0E0',
        opacity: ativo ? 1 : 0.7,
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
        }}
      >
        {/* topo: nome do produto e botoes de editar/excluir */}
        <Box
          sx={{
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
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              size='small'
              onClick={onEdit}
              sx={{ 
                mr: 0,
                color: '#38090D',
                '&:hover': {
                  backgroundColor: '#F4E1D7',
                }
              }}
              aria-label='editar produto'
            >
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={onDelete}
              aria-label={ativo ? 'desativar produto' : 'reativar produto'}
              sx={{
                backgroundColor: 'transparent',
                color: '#38090D',
                border: '2px solid #38090D',
                borderColor: '#38090D',
                '&:hover': {
                  backgroundColor: '#F4E1D7',
                  borderColor: '#38090D',
                },
                borderRadius: '50%',
                width: 22,
                height: 22,
              }}
            >
              {ativo ? <RemoveIcon fontSize='small' /> : <CheckIcon fontSize='small' />}
            </IconButton>
          </Box>
        </Box>

        <Box // linha divisória
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: is_premium ? '#CDA243' : '#38090D',
            my: 0.5,
            mx: 0.5,
          }}
        />

        {/* TODO: validar se vamos inserir o peso / unidade dos produtos ou se foi removido */}

        {/* <Box // alinhando a chave e o valor nas pontas
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '98%',
          }}
        >
          <Typography variant='body1' component='h3' sx={{ fontWeight: 500 }}>
            {isIngredient ? 'Peso(g):' : unidadeMedida === 'kg' ? 'Peso(g):' : 'Unidade: '}
          </Typography>

          <Typography variant='body1' component='h3' sx={{ fontWeight: 500 }}>
            {isIngredient || unidadeMedida === 'kg' ? weight : weight || 1}
          </Typography>
        </Box>

        <Box // linha divisória
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: is_premium ? '#CDA243' : '#38090D',
            my: 0.5,
            mx: 0.5,
          }}
        /> */}

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
