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
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { bottomAbsolute, lineGolden } from '../styles/cart.styles.js';
import { NavbarComponent } from '../../../components/navbar/navbar.component.jsx';

export function CartView({ produtos, onDeleteItem }) {
  const navigate = useNavigate();

  // Tratativa para casos onde produtos pode ser null ou undefined
  const produtosList = produtos?.itensPedido || [];
  const isEmpty = !produtos || !produtos.itensPedido || produtos.itensPedido.length === 0;
  const valorTotal = produtos?.precoTotal || 0;

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
              {produtosList.map((item, index) => (
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
                        {item?.descricao || 'Produto sem descrição'}
                      </Typography>
                      <Typography variant='textLittle' color='text.secondary'>
                        Tema: {item?.informacaoBolo?.tema || 'Genérico'}
                        {item?.quantidade && (
                        <Typography variant='caption' color='text.secondary' sx={{ display: 'block' }}>
                          Peso: {item.quantidade} kg
                        </Typography>
                      )}
                      </Typography>
                      
                      {/* Lista de ingredientes com tratativa */}
                      {item?.ingredientes && Array.isArray(item.ingredientes) && item.ingredientes.length > 0 ? (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant='caption' color='text.secondary' sx={{ fontWeight: 'bold' }}>
                            Ingredientes:
                          </Typography>
                          <Typography variant='caption' color='text.secondary' sx={{ display: 'block' }}>
                            {item.ingredientes
                              .filter(ingrediente => ingrediente && ingrediente.nome) // Filtra ingredientes válidos
                              .map((ingrediente, idx, validIngredients) => (
                                <span key={idx}>
                                  {ingrediente.nome}
                                  {idx < validIngredients.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mt: 1 }}>
                          Ingredientes: Não especificados
                        </Typography>
                      )}
                      
            
                      
                      
                      {/* Observações se existir */}
                      {item?.observacao && (
                        <Typography variant='caption' color='text.secondary' sx={{ display: 'block' }}>
                          Obs: {item.observacao}
                        </Typography>
                      )}
                    </Box>
                    
                    <Box display='flex' alignItems='flex-start'>
                      <Typography variant='subtitle1' fontWeight='bold' mr={1}>
                        R${(item?.precoItem || 0).toFixed(2)}
                      </Typography>
                      <IconButton 
                        size='small'
                        onClick={() => onDeleteItem(item?.idItemPedido)}
                        color='error'
                      >
                        <DeleteIcon />
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
                    <Typography variant='text'>Itens:</Typography>
                    <Typography variant='text'>
                      {produtosList.length} {produtosList.length === 1 ? 'item' : 'itens'}
                    </Typography>
                  </Box>
                  
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='text'>Valor Total:</Typography>
                    <Typography variant='text' fontWeight='bold'>
                      R${valorTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  variant='contained'
                  sx={{ mt: 2, py: 1.5 }}
                  onClick={() => navigate(ROUTES_PATHS.HOME)}
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