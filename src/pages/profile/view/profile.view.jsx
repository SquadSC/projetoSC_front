import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';
import { lineGolden } from '../../../components/navbar/navbar.style';
import { CustomTextField } from '../../../components/text-field/text-field.component';
import { PhoneField } from '../../../components/phone-field/phone-field.component';
import {
  profileContainer,
  avatarContainer,
  avatarStyle,
  infoSection,
  infoRow,
  formStyle,
} from '../styles/profile.styles';
import { formatPhoneForDisplay } from '../utils/profile-formatters';

export function ProfileView({
  user,
  isEditMode,
  fields,
  errors,
  onToggleEditMode,
  onLogout,
  onChange,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* --- CABEÇALHO DINÂMICO --- */}
      <ProfileHeaderDynamic
        title='Perfil'
        isEditMode={isEditMode}
        onToggleEditMode={onToggleEditMode}
      />

      <Container sx={profileContainer}>
        {/* --- SEÇÃO DO AVATAR (apenas visual) --- */}
        <Box sx={avatarContainer}>
          <Avatar sx={avatarStyle} src={user?.avatarUrl || null}>
            {!user?.avatarUrl && (
              <PersonIcon sx={{ fontSize: 80, color: 'grey.500' }} />
            )}
          </Avatar>
        </Box>

        {!isEditMode ? (
          /* --- MODO DE VISUALIZAÇÃO --- */
          <>
            <Typography
              variant='h5'
              fontWeight='semiBold'
              color='primary'
              sx={{ textAlign: 'center', mb: 2 }}
            >
              {user?.nome || 'Nome não informado'}
            </Typography>

            {/* --- SEÇÃO DE INFO --- */}
            <Stack sx={infoSection}>
              <Box sx={infoRow}>
                <Typography
                  variant='body2'
                  fontWeight='semiBold'
                  color='primary'
                >
                  Telefone:
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mt: 0.5 }}
                >
                  {formatPhoneForDisplay(user?.telefone)}
                </Typography>
              </Box>
              <Box sx={infoRow}>
                <Typography
                  variant='body2'
                  fontWeight='semiBold'
                  color='primary'
                >
                  E-mail:
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mt: 0.5 }}
                >
                  {user?.email || 'Não informado'}
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
              value={fields.telefone}
              onChange={e =>
                onChange({
                  target: { name: 'telefone', value: e.target.value },
                })
              }
              error={errors.telefone}
              helperText={errors.telefone}
            />

            <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
              <Button
                type='button'
                variant='outlined'
                color='primary'
                onClick={onCancelEdit}
                sx={{ flex: 1, height: '48px' }}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{ flex: 1, height: '48px' }}
              >
                Salvar
              </Button>
            </Stack>
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
