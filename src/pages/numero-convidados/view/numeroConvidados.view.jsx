import { Box, Button, Container, Stack, Typography, Card, CardContent } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada-component';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../../components/text-field/text-field.component';

export function NumeroConvidadosView({ fields, errors, onChange, onSubmit, resultado }) {

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', p: 1 }}>
            <PageHeader titulo='' showBackButton={true} />

            <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {resultado ? (
                    <>
                        <Stack spacing={4}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4b0a0a', textAlign: 'center' }}>
                                Perfeito!
                            </Typography>

                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                Para servir <b>{resultado.qtd}</b> pessoas, essas são as quantidades recomendadas:
                            </Typography>

                            <Stack spacing={1} alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Peso do Bolo:</Typography>
                                <Typography>{resultado.boloKg} Kg</Typography>
                               
                            </Stack>

                            <Stack spacing={1} alignItems="center">
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Itens Complementares:</Typography>
                                <Typography>Salgados: {resultado.salgados} unidades</Typography>
                                <Typography>Doces: {resultado.doces} unidades</Typography>
                            </Stack>

                            <Button
                                onClick={() => navigate(ROUTES_PATHS.HOME)}
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    backgroundColor: '#3b0a0a',
                                    borderRadius: '24px',
                                    px: 4,
                                    height: 48,
                                    '&:hover': {
                                        backgroundColor: '#2a0707',
                                    }
                                }}
                            >
                                Continuar
                            </Button>
                        </Stack>
                    </>


                ) : (
                    // Mostra o formulário original
                    <>
                        <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mb={3}>
                            <Typography variant='h5'> Antes de Começarmos... </Typography>
                            <Typography variant='body1'>
                                Informe o número de convidados e sugerimos a quantidade ideal do seu pedido!
                            </Typography>
                        </Stack>

                        <Box
                            component="form"
                            onSubmit={onSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <CustomTextField
                                label="Digite a quantidade"
                                type="number"
                                value={fields.quantidade}
                                onChange={e => onChange('quantidade', e.target.value)}
                                error={errors.quantidade}
                                helperText={errors.quantidade}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: '100%', height: '48px', mt: 4 }}
                            >
                                Calcular
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </Box >
    );
}