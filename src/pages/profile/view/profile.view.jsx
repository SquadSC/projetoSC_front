import { Box, Container, Typography, Avatar, Stack, Button, IconButton, TextField, } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close'; // Para o botão "Cancelar"
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';
import { ProfileHeader } from '../../../components/profile-header/profile-header.component';
import { CustomTextField } from '../../../components/text-field/text-field.component';
import { PhoneField } from '../../../components/phone-field/phone-field.component';
import {
    profileContainer,
    avatarContainer,
    avatarStyle,
    editIconStyle,
    infoSection,
    infoRow,
    formStyle,
} from '../styles/profile.styles'; // Importando do arquivo de styles modificado

export function ProfileView({
    user,
    isEditMode,
    fields,
    errors,
    onToggleEditMode,
    onLogout,
    onChange,
    onSubmit,
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ProfileHeader
                title='Perfil'
                showRightButton={true}
                rightButtonIcon={isEditMode ? <CloseIcon /> : <EditIcon />}
                onRightButtonClick={onToggleEditMode}
            />

            <Container sx={profileContainer}>
                {/* --- Seção do Avatar --- */}
                <Box sx={avatarContainer}>
                    <Avatar sx={avatarStyle}>
                        <PersonIcon sx={{ fontSize: 80, color: 'grey.500' }} />
                    </Avatar>
                    {/* O ícone de lápis no avatar só aparece no modo de edição */}
                    {isEditMode && (
                        <IconButton sx={editIconStyle}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                    )}
                </Box>

                {/* --- Renderização Condicional --- */}

                {!isEditMode ? (
                    /* --- MODO DE VISUALIZAÇÃO --- */
                    <>
                        <Typography variant='h5' fontWeight='semiBold' color='primary'>
                            {user.nome}
                        </Typography>
                        <Typography variant='textLittle' color='text.secondary'>
                            Desde {user.memberSinceDisplay}
                        </Typography>

                        <Stack sx={infoSection}>
                            <Box sx={infoRow}>
                                <Typography variant='text' fontWeight='semiBold' color='primary'>
                                    Telefone:
                                </Typography>
                                <Typography variant='text' color='text.secondary'>
                                    {user.telefone}
                                </Typography>
                            </Box>
                            <Box sx={infoRow}>
                                <Typography variant='text' fontWeight='semiBold' color='primary'>
                                    E-mail:
                                </Typography>
                                <Typography variant='text' color='text.secondary'>
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box sx={infoRow}>
                                <Typography variant='text' fontWeight='semiBold' color='primary'>
                                    Data de nascimento:
                                </Typography>
                                <Typography variant='text' color='text.secondary'>
                                    {user.dataNascimentoDisplay}
                                </Typography>
                            </Box>
                            <Box sx={infoRow}>
                                <Typography variant='text' fontWeight='semiBold' color='primary'>
                                    Quantidade de pedidos já feitos:
                                </Typography>
                                <Typography variant='text' color='text.secondary'>
                                    {user.totalPedidos}
                                </Typography>
                            </Box>
                        </Stack>

                        <Button
                            variant='contained'
                            color='primary'
                            onClick={onLogout}
                            sx={{ mt: 4, width: '100%', maxWidth: '400px', height: '48px' }}
                        >
                            Sair
                        </Button>
                    </>
                ) : (
                    /* --- MODO DE EDIÇÃO --- */
                    <Box component='form' onSubmit={onSubmit} sx={formStyle}>
                        <CustomTextField
                            label='Nome completo'
                            type='text'
                            name='nome'
                            value={fields.nome}
                            onChange={onChange}
                            error={errors.nome}
                            helperText={errors.nome}
                        />
                        <PhoneField
                            label='Telefone'
                            name='telefone'
                            value={fields.telefone}
                            onChange={onChange}
                            error={errors.telefone}
                            helperText={errors.telefone}
                        />
                        <TextField
                            label='Data de Nascimento'
                            type='date'
                            name='dataNascimento'
                            value={fields.dataNascimento}
                            onChange={onChange}
                            error={!!errors.dataNascimento}
                            helperText={errors.dataNascimento}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />

                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            sx={{ mt: 2, width: '100%', height: '48px' }}
                        >
                            Salvar Mudanças
                        </Button>
                    </Box>
                )}
            </Container>

            <BottomNavigationComponent />
        </Box>
    );
}