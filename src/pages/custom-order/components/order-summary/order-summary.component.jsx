import * as React from 'react';
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Exemplo de imagens
// const images = [
//   './src/assets/cake-images/cake-floral.png',
//   './src/assets/cake-images/cake-azul.png',
//   './src/assets/cake-images/cake-frutas.png',
// ];

export function OrderSummary({ product, onSubmit }) {
  // Configuração do carrossel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Imagens do produto
  const images = Array.isArray(product.attachment)
    ? product.attachment
    : product.attachment
    ? [product.attachment]
    : [];

  const valorTotal = Number(product.price) || 0;
  const valor50 = valorTotal / 2;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', mt: 4, pb: 4 }}>
      <Typography variant='h6' fontWeight={600}>
        Resumo do pedido
      </Typography>
        <Box sx={{ mt: 2, mb: 3, }}>
          <Slider
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            backgroundColor='grey.200'
          >
            {images.length > 0 ? (
              images.map((img, idx) => (
                <Box
                  key={idx}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <img
                    src={
                      typeof img === 'string' ? img : URL.createObjectURL(img)
                    }
                    alt={`Bolo ${idx + 1}`}
                    style={{
                      width: '100%',
                      maxWidth: 320,
                      height: 220,
                      objectFit: 'cover',
                      margin: '0 auto',
                      borderRadius: 16,
                      padding: 8
                    }}
                  />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  height: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color='text.secondary'>
                  Nenhuma imagem anexada
                </Typography>
              </Box>
            )}
          </Slider>
        </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' fontWeight={600} sx={{ mb: 1 }}>
          Valor do Pedido
        </Typography>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body1'>Valor total:</Typography>
          <Typography variant='body1' fontWeight={600}>
            R${valorTotal.toFixed(2)}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body1'>50% do valor:</Typography>
          <Typography variant='body1' fontWeight={600}>
            R${valor50.toFixed(2)}
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
        <ul style={{ marginTop: 0, marginBottom: 8 }}>
          {product.ingredientList?.map((ing, idx) => (
            <li key={idx}>
              {ing.type ? `${ing.type}: ` : ''}
              {ing.name}
              {ing.isPremium ? ' (premium)' : ''}
            </li>
          ))}
        </ul>
        <Typography variant='subtitle1' fontWeight={600} sx={{ mt: 1 }}>
          Detalhes adicionais do pedido:
        </Typography>
        <Typography variant='body2' sx={{ mt: 0.5 }}>
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
