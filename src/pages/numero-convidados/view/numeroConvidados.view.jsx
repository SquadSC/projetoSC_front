import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada-component';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../../components/text-field/text-field.component';

export function NumeroConvidadosView({ fields, errors, onChange, onSubmit }) {

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header com botão voltar */}
            <PageHeader titulo='' showBackButton={true} />
            <PageHeader titulo='Número de Convidados' showBackButton={false} />

            <Container sx={{ p: 3 }}>
                <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mb={3}>
                    <Typography variant='h5'> Antes de Começarmos... </Typography>
                    <Typography variant='body1'> Informe o número de convidados e sugerimos a quantidade ideal do seu pedido! </Typography>
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
            </Container>
        </Box>
    );
}