import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { NavbarComponent } from '../../../components/navbar/navbar.component.jsx';
import bgCakeImage from '../../../assets/cake-images/bg-cake.png';
import CakeImage_Floral from '../../../assets/cake-images/cake-floral.png';
import CakeImage_Azul from '../../../assets/cake-images/cake-azul.png';
import CakeImage_Frutas from '../../../assets/cake-images/cake-frutas.png';

import { CakeCarousel } from '../components/cake-carousel.component';
import IconRestaurant from '../../../assets/cake-images/icon-restaurant.svg';
import { FeedbackCarousel } from '../components/feedback-carousel.component';
import React from 'react';
import { PrevArrow, NextArrow } from '../components/carousel-arrows.component';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component.jsx';

const mockCakes = [
  {
    id: 1,
    title: 'Bolo Floral',
    description: 'Bolo de 2 andares com flores de açúcar',
    image: CakeImage_Floral,
  },
  {
    id: 2,
    title: 'Bolo Azul',
    description: 'Bolo decorado com buttercream azul e detalhes dourados',
    image: CakeImage_Azul,
  },
  {
    id: 3,
    title: 'Bolo de Frutas',
    description: 'Bolo com frutas vermelhas frescas e creme',
    image: CakeImage_Frutas,
  },
];

const mockFeedbacks = [
  {
    id: 1,
    quote:
      'Tudo feito com muito amor, capricho e carinho para os clientes. Os melhores recheios, docinhos e salgados, sempre trazendo novidades para os clientes, um trabalho impecável!!',
    authorName: 'Gabriella Ramos',
    authorInfo: 'Muito bom',
  },
  {
    id: 2,
    quote:
      'O melhor bolo que já comi na vida! A entrega foi super rápida e o atendimento é excelente. Recomendo de olhos fechados!',
    authorName: 'João Silva',
    authorInfo: 'Excelente',
  },
];

export function HomeView() {
  const navigate = useNavigate();
  // config das setas de carrossel
  const feedbackSliderRef = React.useRef(null);
  const handleNextFeedback = () => {
    feedbackSliderRef.current.slickNext();
  };
  const handlePrevFeedback = () => {
    feedbackSliderRef.current.slickPrev();
  };
  return (
    <>
      <NavbarComponent></NavbarComponent>

      {/* --- SEÇÃO DO BANNER INICIAL --- */}
      <Container
        sx={{
          width: '100%',
          height: '60dvh',
          // md: '100vh',
          maxHeight: '700px',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: 4,

          backgroundImage: `url(${bgCakeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Stack // banner
          sx={{
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '90%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Typography variant='h4' color='tertiary' fontWeight={600}>
              Seu pedido, do seu jeito!
            </Typography>
            <Typography variant='h8' color='tertiary'>
              Escolha sabores, tamanhos e detalhes para deixar tudo do seu
              jeitinho.
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate(ROUTES_PATHS.ORDER_SUMMARY_CAKE)}
              sx={{
                width: { xs: '80%', sm: '60%', md: '50%' },
                py: 1.5,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              Personalizar Pedido
            </Button>
          </Box>
        </Stack>
      </Container>

      {/* --- SEÇÃO DE 'REFERÊNCIAS' --- */}

      <Container
        sx={{
          p: '3, 3, 0',
          marginTop: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Stack
          sx={{
            gap: 2,
          }}
        >
          <Typography variant='body1' sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Referências</Typography>
          <Typography variant='h5' fontWeight={600}>
            Se inspire para seu pedido
          </Typography>
        </Stack>
      </Container>

      <CakeCarousel cakes={mockCakes} />

      {/* --- SEÇÃO DE 'POR QUE ESCOLHER A ELÊ DOCES' --- */}
      <Container
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          // height: '630px',
          maxWidth: 'lg',
        }}
      >
        <Stack
          sx={{
            gap: 2,
            mb: 4,
          }}
        >
          <Typography variant='body1' sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Confeitaria</Typography>
          <Typography variant='h5' fontWeight={600}>
            Por que escolher a Elê Doces?
          </Typography>
        </Stack>

        <Stack // elementos
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' },
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              // height: '50%',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <img
                src={IconRestaurant}
                alt='Ícone de restaurante'
                style={{ width: '100%' }}
              />
            </Box>
            <Typography variant='h6' fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Feito Sob Encomenda
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
              Cada pedido é único, feito especialmente para você, com atenção
              aos detalhes e ao que você imagina.
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <img
                src={IconRestaurant}
                alt='Ícone de restaurante'
                style={{ width: '100%' }}
              />
            </Box>
            <Typography variant='h6' fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              100% Artesanal
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
              Produzimos de forma artesanal, com cuidado e carinho em cada
              etapa.
            </Typography>
          </Box>
       
          <Box
            sx={{
              width: '100%',
              // height: '50%',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <img
                src={IconRestaurant}
                alt='Ícone de restaurante'
                style={{ width: '100%' }}
              />
            </Box>
            <Typography variant='h6' fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Ingredientes de Qualidade
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
              Só usamos ingredientes frescos e selecionados. Aqui não tem massa
              pronta, tudo é feito do zero.
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <img
                src={IconRestaurant}
                alt='Ícone de restaurante'
                style={{ width: '100%' }}
              />
            </Box>
            <Typography variant='h6' fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Personalização Total
            </Typography>
            <Typography variant='body1' sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
              Você escolhe sabores, tamanhos, recheios e pode enviar referências
              de decoração para deixar do seu jeitinho.
            </Typography>
          </Box>
        </Stack>
      </Container>

      {/* --- SEÇÃO DE 'FEEDBACKS/AVALIAÇÕES' --- */}
      <Container
        sx={{
          marginTop: 4,
          textAlign: 'center',
        }}
      >
        <Stack
          sx={{
            gap: 2,
          }}
        >
          <Typography variant='body1' sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>Avaliações</Typography>
          <Typography variant='h5' fontWeight={600}>
            Quem já pediu, recomenda!
          </Typography>
        </Stack>
      </Container>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={1}
        sx={{ width: '100%', px: 1, my: 2, marginBottom: 10 }}
      >
        <PrevArrow onClick={handlePrevFeedback} />
        <FeedbackCarousel ref={feedbackSliderRef} feedbacks={mockFeedbacks} />
        <NextArrow onClick={handleNextFeedback} />
      </Stack>

      <BottomNavigationComponent></BottomNavigationComponent>

      {/* <Container sx={{ p: 3 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate(ROUTES_PATHS.REGISTER_USER)}
        >
          Cadastro
        </Button>
      </Container> */}
    </>
  );
}
