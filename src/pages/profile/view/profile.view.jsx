import { Box, Container, Typography, Avatar, Stack, Button, IconButton, TextField, } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';
import { lineGolden } from '../../../components/navbar/navbar.style';
import { CustomTextField } from '../../../components/text-field/text-field.component';
import { PhoneField } from '../../../components/phone-field/phone-field.component';
import { profileContainer, avatarContainer, avatarStyle, editIconStyle, infoSection, infoRow, formStyle, } from '../styles/profile.styles';

export function ProfileView({
    user,
    isEditMode,
    fields,
    errors,
    onToggleEditMode,
    onLogout,
    onChange,
    onSubmit,
    avatarPreview,
    fileInputRef,
    onAvatarClick,
    onAvatarChange,
}) {

    const avatarSrc = avatarPreview || user.avatarUrl || null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* --- CABEÇALHO DINÂMICO --- */}
            <ProfileHeaderDynamic
                title="Perfil"
                isEditMode={isEditMode}
                onToggleEditMode={onToggleEditMode}
            />

            <Container sx={profileContainer}>

                {/* --- SEÇÃO DO AVATAR --- */}
                <Box sx={avatarContainer}>
                    <Avatar
                        sx={avatarStyle}
                        src={avatarSrc}
                    >
                        {/* Se 'avatarSrc' for nulo, mostre o ícone padrão */}
                        {!avatarSrc && (
                            <PersonIcon sx={{ fontSize: 80, color: 'grey.500' }} />
                        )}
                    </Avatar>

                    {isEditMode && (
                        <IconButton
                            sx={editIconStyle}
                            onClick={onAvatarClick}
                        >
                            <EditIcon fontSize='small' />
                        </IconButton>
                    )}
                </Box>

                {/* Input oculto para upload de avatar */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onAvatarChange}
                    hidden
                    accept="image/*" // Aceita apenas imagens
                />

                {!isEditMode ? (
                    /* --- MODO DE VISUALIZAÇÃO --- */
                    <>
                        <Typography variant='h5' fontWeight='semiBold' color='primary'>
                            {user.nome}
                        </Typography>
                        <Typography variant='textLittle' color='text.secondary'>
                            Desde {user.memberSinceDisplay}
                        </Typography>

                        {/* --- SEÇÃO DE INFO --- */}
                        <Stack sx={infoSection}>
                            <Box sx={infoRow}>
                                <Typography variant='body2' fontWeight='semiBold' color='primary'>
                                    Telefone:
                                </Typography>
                                <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                                    {user.telefone}
                                </Typography>
                            </Box>
                            <Box sx={infoRow}>
                                <Typography variant='body2' fontWeight='semiBold' color='primary'>
                                    E-mail:
                                </Typography>
                                <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box sx={infoRow}>
                                <Typography variant='body2' fontWeight='semiBold' color='primary'>
                                    Data de nascimento:
                                </Typography>
                                <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                                    {user.dataNascimentoDisplay}
                                </Typography>
                            </Box>
                            <Box sx={infoRow}>
                                <Typography variant='body2' fontWeight='semiBold' color='primary'>
                                    Quantidade de pedidos já feitos:
                                </Typography>
                                <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                                    {user.totalPedidos}
                                </Typography>
                            </Box>
                        </Stack>

                        {/*--- BOTÃO DE SAIR --- */}
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={onLogout}
                            sx={{
                                mt: 'auto',
                                pt: 1,
                                width: '100%',
                                maxWidth: '400px',
                                height: '48px',
                            }}
                        >
                            Sair
                        </Button>
                    </>
                ) : (
                    /* --- MODO DE EDIÇÃO --- */
                    <Box component='form' onSubmit={onSubmit} sx={formStyle}>

                        {/* --- INPUTS DO FORMULÁRIO --- */}
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

// --- Componente Header Dinâmico ---
function ProfileHeaderDynamic({ title, isEditMode, onToggleEditMode }) {
    return (
        <Box sx={{ bgcolor: 'secondary.main', width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    width: '100%',
                    px: 2,
                    py: 2,
                }}
            >
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
                    {title}
                </Typography>

                {/* Botão dinâmico */}
                <IconButton
                    onClick={onToggleEditMode}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'primary.main',
                    }}
                >
                    {isEditMode ? <CloseIcon /> : <EditIcon />}
                </IconButton>
            </Box>
            <Box sx={lineGolden} />
        </Box>
    );
}