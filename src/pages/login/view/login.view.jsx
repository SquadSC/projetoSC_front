
    import { Button, Container, Stack, Typography, Link, Box } from '@mui/material';
    import { HeaderComponent } from "../../../components/header/header-component";
    import { CustomTextField } from '../../../components/text-field/custom-text-field';
    import theme from '../../../theme';
    export function LoginView ({ fields, error, onSubmit, onChange}) {
        return (
            <>
            <HeaderComponent
                titulo="Bem-vindo à Elê Doces!"
                pagina="Peça seus doces de forma rápida, prática e com todo o carinho de sempre."
            />
            <Container sx={{ p: 2 }}>
                <Stack spacing={{ xs: 1, sm: 2, md: 4 }} mb={3}>
                    <Typography variant="h5">Que bom te ver de novo!</Typography>
                    <Typography variant="body1">Entre e continue adoçando seus dias com a gente</Typography>
                </Stack>
                <Box
                component='form' 
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                onSubmit={onSubmit}
                >
                    
                    <Typography
                    sx={{fontWeight: 'bold'}}
                    >E-mail
                    </Typography>
                    <CustomTextField
                        label='E-mail'
                        type='email'
                        value={fields.email}
                        onChange={e => onChange('email', e.target.value)}
                        error={error.email}
                        helperText={error.email}
                        />

                    <Typography
                    sx={{fontWeight: 'bold', mt: 2}}
                    >Senha
                    </Typography>
                    <CustomTextField
                        label='Senha'
                        type='password'
                        value={fields.password}
                        onChange={e => onChange('password', e.target.value)}
                        error={error.password}
                        helperText={error.password}
                        />
                        <Link href="#" variant="body2" sx={{ alignSelf: 'flex-end'}}>
                            Esqueceu sua senha?
                        </Link>
                    

                    <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    sx={{ width: '100%', height: '48px', mt: 4 }}
                    >
                    <Typography sx = {{ fontWeight: 'bold' }}>
                            Entrar
                        </Typography>
                    </Button>
                    <Button 
                    variant="contained" 
                    color="transparent"
                    type="submit"
                    sx={{mt:1, width: '100%', height: '48px', border: `1px solid ${theme.palette.primary.main}`, color: theme.palette.primary.main }}
                    >
                        <Typography sx = {{ fontWeight: 'bold' }}>
                            Cadastre-se
                        </Typography>
                    </Button>
                </Box>
        </Container>

            </>
        )
    }