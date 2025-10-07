import * as React from 'react';
import { Button, Container, Typography, Box, Stack, capitalize } from '@mui/material';
import { formatCurrencyBRL } from '../../../../utils/formatter/currency-formatter/currency-formatter';

export function OrderSummary({ product, onSubmit }) {
  // Função para converter base64 para imagem
  const getImageSrc = attachment => {
    if (!attachment) return null;

    // Se já é uma string (base64 ou URL)
    if (typeof attachment === 'string') {
      // Se já tem o prefixo data:image, retorna como está
      if (attachment.startsWith('data:image/')) {
        return attachment;
      }
      // Se é base64 sem prefixo, adiciona o prefixo
      if (attachment.length > 0) {
        return `data:image/jpeg;base64,${attachment}`;
      }
    }

    // Se é um arquivo (File object)
    if (attachment instanceof File) {
      return URL.createObjectURL(attachment);
    }
    
    return null;
  };
  const capitalizeFirst = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

  const imageSrc = getImageSrc(product.attachment);
  const valorTotal = Number(product.price) || 0;
  const valorTotalFormatado = formatCurrencyBRL(valorTotal);
  const valor50 = formatCurrencyBRL(valorTotal / 2);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 4,
        pb: 4,
        color: 'primary.main',
      }}
    >
      <Typography variant='h6' fontWeight={600}>
        Resumo do pedido
      </Typography>
      <Box sx={{ mt: 2, mb: 3 }}>
        {imageSrc ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={imageSrc}
              alt='Bolo personalizado'
              style={{
                width: '100%',
                maxWidth: 320,
                height: 220,
                objectFit: 'cover',
                margin: '0 auto',
                borderRadius: 16,
                padding: 8,
              }}
              onError={e => {
                console.error('Erro ao carregar imagem:', e);
                e.target.style.display = 'none';
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
              borderRadius: 2,
              margin: '0 8px',
            }}
          >
            <Typography color='text.secondary'>
              Nenhuma imagem anexada
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' fontWeight={600} sx={{ mb: 1 }}>
          Valor do Pedido
        </Typography>
        <Stack direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
          <Typography variant='text' fontWeight={600}>
            Valor total:
          </Typography>
          <Typography variant='text' fontWeight={600} color='grey'>
            {valorTotalFormatado}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
          <Typography variant='text' fontWeight={600}>
            50% do valor:
          </Typography>
          <Typography variant='text' fontWeight={600} color='grey'>
            {valor50}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' fontWeight={600} sx={{ mb: 1 }}>
          Detalhes
        </Typography>
        <Typography variant='subtitle1' fontWeight={600}>
          Bolo:
        </Typography>
        <ul style={{ marginTop: 1, marginBottom: 8, color: 'grey', gap: 4 }}>
          {product.ingredientList?.map((ingred, idx) => (
            <li key={idx}>
              {capitalizeFirst(ingred.tipoIngrediente.descricao) ? `${capitalizeFirst(ingred.tipoIngrediente.descricao)}: ` : ''}
              {ingred.nome}
              {ingred.premium ? ' (premium)' : ''}
            </li>
          ))}
        </ul>
        <Typography variant='subtitle1' fontWeight={600} sx={{ mt: 1 }}>
          Detalhes adicionais do pedido:
        </Typography>
        <Typography variant='textLittle' sx={{ mt: 1, color: 'grey' }}>
          {product.observation || 'Nenhuma observação adicional.'}
        </Typography>
      </Box>

      <Button
        variant='contained'
        color='primary'
        fullWidth
        sx={{ borderRadius: '24px', height: '48px', mt: 2 }}
        onClick={onSubmit}
      >
        Finalizar Pedido
      </Button>
    </Container>
  );
}
