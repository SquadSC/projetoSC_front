import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavbarComponent } from '../../../components/navbar/navbar.component.jsx';
import bgCakeImage from '../../../assets/cake-images/bg-cake.png';
import { CakeCarousel } from '../components/cake-carousel.component';
import IconRestaurant from '../../../assets/cake-images/icon-restaurant.svg';

const mockCakes = [
  {
    id: 1,
    title: 'Bolo Floral',
    description: 'Bolo de 2 andares com flores de açúcar',
    image: bgCakeImage,
  },
  {
    id: 2,
    title: 'Bolo Azul',
    description: 'Bolo decorado com buttercream azul e detalhes dourados',
    image: bgCakeImage,
  },
  {
    id: 3,
    title: 'Bolo de Frutas',
    description: 'Bolo com frutas vermelhas frescas e creme',
    image: bgCakeImage,
  },
];

export function HomeView() {
  const navigate = useNavigate();

  return (
    <>
      <NavbarComponent></NavbarComponent>

      <Container // banner
        sx={{
          width: '100%',
          height: '55vh',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4,

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
              onClick={() => navigate(ROUTES_PATHS.NUMERO_CONVIDADOS)}
              sx={{
                width: { xs: '80%', sm: '60%', md: '50%' },
                py: 1.5,
              }}
            >
              Personalizar Pedido
            </Button>
          </Box>
        </Stack>
      </Container>

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
        <Stack // referencias
          sx={{
            gap: 2,
          }}
        >
          <Typography variant='body1'>Referências</Typography>
          <Typography variant='h5' fontWeight={600}>
            Se inspire para seu pedido
          </Typography>
        </Stack>
      </Container>
      <CakeCarousel cakes={mockCakes} />

      <Container
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between', // psd
          textAlign: 'center',
          height: '630px',
        }}
      >
        <Stack // pq ele doces
          sx={{
            gap: 2,
          }}
        >
          <Typography variant='body1'>Confeitaria</Typography>
          <Typography variant='h5' fontWeight={600}>
            Por que escolher a Elê Doces?
          </Typography>
        </Stack>

        <Stack // cima
          sx={{
            display: 'flex',
            flexDirection: 'row',
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
            <Typography variant='h6' fontWeight={600}>
              Feito Sob Encomenda
            </Typography>
            <Typography variant='body1'>
              Cada pedido é único, feito especialmente para você, com atenção
              aos detalhes e ao que você imagina.
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
            <Typography variant='h6' fontWeight={600}>
              100% Artesanal
            </Typography>
            <Typography variant='body1'>
              Produzimos de forma artesanal, com cuidado e carinho em cada
              etapa.
            </Typography>
          </Box>
        </Stack>

        <Stack // baixo
          sx={{
            gap: 2,
            flexDirection: 'row',
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
            <Typography variant='h6' fontWeight={600}>
              Ingredientes de Qualidade
            </Typography>
            <Typography variant='body1'>
              Só usamos ingredientes frescos e selecionados. Aqui não tem massa
              pronta, tudo é feito do zero.
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
            <Typography variant='h6' fontWeight={600}>
              Personalização Total
            </Typography>
            <Typography variant='body1'>
              Você escolhe sabores, tamanhos, recheios e pode enviar referências
              de decoração para deixar do seu jeitinho.
            </Typography>
          </Box>
        </Stack>
      </Container>

      <Container
        sx={{
          p: '3, 3, 0',
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          height: '630px',
        }}
      >
        <Stack // avaliações
          sx={{
            gap: 2,
          }}
        >
          <Typography variant='body1'>Avaliações</Typography>
          <Typography variant='h5' fontWeight={600}>
            Quem já pediu, recomenda!
          </Typography>
        </Stack>
      </Container>

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
