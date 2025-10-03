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
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { bottomAbsolute, lineGolden } from '../styles/cart.styles.js';
import { NavbarComponent } from '../../../components/navbar/navbar.component.jsx';

export function CartView({ produtos }) {
  const navigate = useNavigate();

  const isEmpty = produtos.length === 0; // corrigi aqui
  const valorTotal = produtos.reduce((acc, item) => acc + item.preco, 0);

  return (
    <>
      <NavbarComponent></NavbarComponent>
      <Container sx={{ p: 3 }}>
        {isEmpty ? (
          <>
            <Box
              sx={{
                width: '100%',
                height: '35vh',
                p: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 120, color: 'primary.main' }} />
            </Box>

            <Stack
              spacing={2}
              alignItems='center'
              justifyContent='center'
              sx={{
                border: '2px solid',
                borderColor: 'primary.main',
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant='h6'>Seu carrinho está vazio!</Typography>
              <Button
                onClick={() => navigate(ROUTES_PATHS.HOME)}
                variant='outlined'
                sx={{ height: 48 }}
              >
                Monte seu Pedido
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {/* Lista de Produtos */}
            <Stack
              spacing={2}
              sx={{
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 2,
                p: 2,
              }}
            >
              {produtos.map((item, index) => (
                <Card key={index} variant='outlined' sx={{ borderRadius: 2 }}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Typography variant='subtitle1' fontWeight='bold'>
                        {item.nome}
                      </Typography>
                      <Typography
                        variant='textLittleBold'
                        color='text.secondary'
                      >
                        {item.descricao}
                      </Typography>
                    </Box>
                    <Box display='flex' alignItems='flex-start'>
                      <Typography variant='subtitle1' fontWeight='bold' mr={1}>
                        R${(item?.preco || 0).toFixed(2)}
                      </Typography>
                      <IconButton size='small'>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {/* Resumo do Pedido */}
            <Box sx={{ width: '100%', height: 200 }}></Box>
            <Box sx={bottomAbsolute}>
              <Box sx={lineGolden}></Box>
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                  Resumo do Pedido
                </Typography>

                <Stack spacing={1}>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='textBold'>Valor Total:</Typography>
                    <Typography variant='textBold' fontWeight='bold'>
                      R${valorTotal.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='textLittleBold'>
                      Data de Entrega:
                    </Typography>
                    <Typography variant='textLittleBold'>
                      16 Setembro, 2025
                    </Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='textLittleBold'>
                      Horário de Entrega:
                    </Typography>
                    <Typography variant='textLittleBold'>11:54 PM</Typography>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  variant='contained'
                  sx={{ mt: 2, py: 1.5 }}
                  onClick={() => navigate(ROUTES_PATHS.HOME)} // Quando a tela de pagamento estiver pronta, alterar essa navegação
                >
                  Continuar o Pedido
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
