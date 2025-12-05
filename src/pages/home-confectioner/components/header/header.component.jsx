import { Box, Stack, Typography } from '@mui/material';
import profileIcon from '../../../../assets/icons/user-perfil.svg';

export function Header({ user }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          direction={'row'}
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <img
            src={profileIcon}
            alt=''
          />
          <Stack spacing={0}>
            <Typography variant='textLittle' color='primary.main'>
              Olá
            </Typography>
            <Typography
              variant='text'
              fontWeight={'medium'}
              color='primary.main'
            >
              {user?.nome || 'Erro ao carregar nome'}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
