import { Button, Container, Stack, Typography, Link, Box } from '@mui/material';
import { HeaderComponent } from '../../../components/header/header-component';
import { useNavigate } from 'react-router-dom';

export function AddressMenuView ( {addresses, onSelectAddress, onAddNewAddress, onConfirm }) {
    const navigate = useNavigate();

    return (
        <>
        <HeaderComponent
        titulo='Entrega do Pedido'
        />
        <Container sx={{p:3}}>
            <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mb={3}>
          <Typography variant='h5'>Que bom te ver de novo!</Typography>
          <Typography variant='body1'>
            Entre e continue adoçando seus dias com a gente
          </Typography>
        </Stack>

        </Container>

        </>
    );
}
