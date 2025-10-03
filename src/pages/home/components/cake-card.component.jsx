import { Box, Card, CardMedia, Typography, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

export function CakeCard({ image, title, description }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 2.5 }}>
      {' '}
      {/* Adiciona um padding para a sombra do card aparecer */}
      <Card
        elevation={4}
        sx={{
          borderRadius: '20px',
          textAlign: 'start',
          border: theme => `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <CardMedia
          component='img'
          height='200'
          image={image}
          alt={title}
          sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
        />
        <Box
          sx={{
            p: 2,
            border: theme => `1px solid ${theme.palette.divider}`,
            borderTop: 'none',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
          }}
        >
          <Stack spacing={1}>
            <Typography variant='textBold' fontWeight='bold' color='primary'>
              {title}
            </Typography>
            <Typography variant='textLittleBold' color='text.secondary'>
              {description}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              sx={{ mt: 1, borderRadius: '24px', py: 1 }}
              onClick={() => navigate(ROUTES_PATHS.ORDER_SUMMARY_CAKE)}
            >
              Quero algo assim
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}

CakeCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
