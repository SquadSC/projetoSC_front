import React from 'react'; // Removido useState e useEffect
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  Avatar,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper, // Adicionando Paper ao import
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CarouselReferenceComponent } from '../../order-summary-cake/components/carousel-reference/carousel-refence.component.jsx';

// ***************************************************************
// CORREÇÃO: Receber refImages como prop e remover estados/efeitos internos
export default function OrderDetailsView({
  order,
  onCancel,
  onEdit,
  refImages,
}) {
  // REMOVIDOS: useState e useEffect. O componente agora é apresentacional.

  if (!order || !refImages) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='300px'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    // Usamos Fragment (<>) para renderizar o Header fora do Container
    <>
      {/* Cabeçalho - De ponta a ponta (100% de largura) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: 'secondary.light',
          width: '100%',
          px: 2, // Adiciona padding lateral para o conteúdo interno
          py: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onCancel}
          sx={{
            minWidth: 0,
            color: 'primary.main',
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        <Typography
          sx={theme => ({
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: theme.typography?.fontFamily,
            fontSize: theme.typography?.subTitle?.fontSize,
            fontWeight: theme.typography?.fontWeightMedium,
            color: 'primary.main',
          })}
        >
          Detalhes do Pedido
        </Typography>
        <IconButton
          onClick={() => onEdit(order)}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'primary.main',
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Box>

      {/* Conteúdo Principal - Dentro do Container para alinhamento */}
      <Container sx={{}}>
        <Box sx={{ mt: 3 }}>
          {/* *************************************************************** */}
          {/* NOVO BLOCO: Dados do cliente e Entrega, usando a estrutura Paper/Grid */}
          {/* Removemos o 'p: 2' do Box externo e adicionamos padding ao Paper e outros Boxes */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              mb: 2,
              // Cor de fundo do Paper mantida
              bgcolor: 'tertiary.main',
            }}
          >
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                  {order.customer.avatar ? (
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </Avatar>
              </Grid>
              <Grid sx={{ color: 'primary.main' }} item xs>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {order.customer.name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Desde {order.customer.memberSince}
                </Typography>
              </Grid>

              {/* Bloco de Data, Hora e Local */}
              <Grid item xs={12} sx={{ mt: 1, color: 'primary.main' }}>
                {/* Este Grid agora será o contêiner vertical para os 3 itens */}
                <Grid container direction='column' spacing={1}>
                  {/* Item 1: Data de Entrega */}
                  <Grid item xs={12} display='flex' alignItems='center'>
                    <CalendarTodayIcon
                      fontSize='small'
                      sx={{ mr: 1, color: 'primary.main' }}
                    />
                    <Typography variant='body2' sx={{ fontSize: '0.9rem' }}>
                      Data: {order.deliveryDate}
                    </Typography>
                  </Grid>

                  {/* Item 2: Hora de Entrega (Agora alinhado verticalmente) */}
                  <Grid item xs={12} display='flex' alignItems='center'>
                    <AccessTimeIcon
                      fontSize='small'
                      sx={{ mr: 1, color: 'primary.main' }}
                    />
                    <Typography variant='body2' sx={{ fontSize: '0.9rem' }}>
                      Hora: {order.deliveryTime}
                    </Typography>
                  </Grid>

                  {/* Item 3: Endereço/Local (Agora alinhado verticalmente) */}
                  <Grid item xs={12} display='flex' alignItems='center'>
                    <PlaceIcon
                      fontSize='small'
                      sx={{ mr: 1, color: 'primary.main' }}
                    />
                    <Typography variant='body2' sx={{ fontSize: '0.9rem' }}>
                      {order.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {/* FIM DO NOVO BLOCO */}
          {/* *************************************************************** */}

          <Divider sx={{ my: 3 }} />

          {/* Total */}
          <Box textAlign='center'>
            <Typography
              sx={theme => ({
                fontFamily: theme.typography?.fontFamily,
                fontSize: theme.typography?.subTitle?.fontSize,
                fontWeight: theme.typography?.fontWeightBold,
                color: 'primary.main',
              })}
            >
              Total: R${order.total}
            </Typography>
            <Typography
              sx={theme => ({
                fontFamily: theme.typography?.fontFamily,
                fontSize: theme.typography?.textBold?.fontSize,
                color: 'primary.main',
              })}
            >
              {order.paidPercent}% do valor: R$
              {Math.round((order.total * order.paidPercent) / 100)}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Anexos */}
          <Box>
            {/* Renderização Condicional do Carrossel */}
            {refImages.loading ? (
              <Box display='flex' justifyContent='center' py={4}>
                <CircularProgress size={24} />
              </Box>
            ) : refImages.images && refImages.images.length > 0 ? (
              <>
                <Typography
                  sx={theme => ({
                    mb: 0,
                    fontFamily: theme.typography?.fontFamily,
                    fontSize: theme.typography?.textBold?.fontSize,
                    fontWeight: theme.typography?.fontWeightMedium,
                  })}
                ></Typography>
                <CarouselReferenceComponent refImages={refImages} />
              </>
            ) : (
              <Typography
                variant='body2'
                sx={{ mt: 1, color: 'text.secondary' }}
              >
                Nenhuma imagem de referência anexada.
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Detalhes do bolo */}
          <Typography
            sx={theme => ({
              mb: 1,
              fontFamily: theme.typography?.fontFamily,
              fontSize: theme.typography?.subTitleLittleBold?.fontSize,
              fontWeight: theme.typography?.fontWeightSemiBold,
              color: 'primary.main',
            })}
          >
            Detalhes do Bolo:
          </Typography>

          <List disablePadding>
            {[
                ['Produto:', order.cakeDetails.cakeType],
                ['Tema Personalizado:', order.cakeDetails.theme],
                ['Tipo de Massa:', order.cakeDetails.batter],
                [
                'Recheio do Bolo:',
                <ul style={{ listStyleType: 'disc' }}>
                  {order.cakeDetails.filling.map(f => (
                    <li key={f.nome}>{f.nome}</li>
                  ))}
                </ul>,
              ],
              [
                'Adicionais do Bolo:',
                <ul style={{ listStyleType: 'disc' }}>
                  {order.cakeDetails.additions.map(f => (
                    <li key={f.nome}>{f.nome}</li>
                  ))}
                </ul>,
              ],
              ['Peso (KG):', order.cakeDetails.weightKg],
            ].map(([label, value]) => (
              <ListItem
                key={label}
                disableGutters
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: 0.5,
                }}
              >
                <ListItemText
                  primary={label}
                  secondary={value}
                  primaryTypographyProps={{
                    sx: theme => ({
                      fontFamily: theme.typography?.fontFamily,
                      fontSize: theme.typography?.textBold?.fontSize,
                      fontWeight: theme.typography?.fontWeightSemiBold,
                    }),
                  }}
                  secondaryTypographyProps={{
                    component: 'div', // 👈 prevents <p> wrapping
                    sx: theme => ({
                      fontFamily: theme.typography?.fontFamily,
                      fontSize: theme.typography?.textLittleBold?.fontSize,
                      mt: 0.5,
                      color: 'text.primary',
                    }),
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}

OrderDetailsView.propTypes = {
  order: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  refImages: PropTypes.object.isRequired,
};
