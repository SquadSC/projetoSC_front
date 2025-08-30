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
              // Alteração 2: Ajustes de largura e margem no próprio botão
              sx={{
                width: { xs: '80%', sm: '60%', md: '50%' }, // O botão será mais largo
                py: 1.5, // Aumenta a altura do botão (padding vertical)
              }}
            >
              Personalizar bolo
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
