import { Typography, IconButton, Box, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

export function PageHeader({ titulo, showBackButton = false }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Stack direction='column' alignItems='center' spacing={2} pb={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {showBackButton && (
            <IconButton edge='start' color='inherit' onClick={handleBack}>
              <ArrowBackIosNewIcon />
            </IconButton>
          )}
        </Box>

        <Typography
          variant='h5'
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            color: 'primary.main',
            fontWeight: 'semiBold',
          }}
        >
          {titulo}
        </Typography>
      </Stack>
    </Box>
  );
}
