import { Box, Container, Stack, Typography, LinearProgress } from '@mui/material';
import { CalendarToday, AccessTime } from '@mui/icons-material';
import theme from '../../theme';
export function OrderComponent({ pedido }) {

    if (pedido.status >= 2) {

    }
    else if (pedido.status > 4) {
        let text

        if (pedido.status >= 2 || pedido.status == null)
            switch (pedido.status) {
                case 2:
                    text = "Confeiteira está verificando disponibilidade."
                case 3:
                    text = "Confeiteira está vendo disponibilidade com o fornecedor."
                case 4:
                    text = "Aguardando 50% do pagamento."

            }
        else
            return

        return (
            <>
                <Typography variant='subtitle1'>{text}</Typography>
                <Stack>

                </Stack>
            </>
        )

    }

    return (
        <>
            <Container sx={{ backgroundColor: theme.palette.secondary.main, border: '2px solid', borderColor: theme.palette.primary.main, borderRadius: '7px', p: 2 }}>
                <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'end', mb: 1 }}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 550 }}>Ordem#{pedido.idPedido}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body">{pedido.tipoPedido}</Typography>
                    </Box>
                </Stack>
                <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <CalendarToday sx={{ color: theme.palette.text.secondary }} />

                        <Typography color='text.secondary'>{pedido.dataPedido}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <AccessTime sx={{ color: theme.palette.text.secondary }} />
                        <Typography color='text.secondary'>{pedido.horarioPedido}</Typography>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}
