import { useNavigate } from 'react-router-dom';
import { ProfileView } from '../view/profile.view';
import { useUser } from '../../../hooks/use-user/useUser';
import { useProfileEdit } from '../hooks/use-profile-edit';
import { formatFormDataForAPI } from '../utils/profile-formatters';
import { request } from '../../../services/api';
import { logout, getUserData, saveUserData } from '../../../utils/auth';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import Swal from 'sweetalert2';

export function ProfileController() {
  const navigate = useNavigate();
  const { user, refreshUser } = useUser();

  // Hook customizado seguindo padrão TDD
  const profileEdit = useProfileEdit(user); // Handlers principais seguindo padrão TDD
  const handleLogout = () => {
    Swal.fire({
      title: 'Deseja realmente sair?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sair',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#38090D',
      cancelButtonColor: '#6c757d',
    }).then(result => {
      if (result.isConfirmed) {
        logout();
        navigate(ROUTES_PATHS.LOGIN);
      }
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!profileEdit.validateForm()) {
      return;
    }

    const userId = user?.id;
    if (!userId) {
      Swal.fire('Erro', 'Sessão expirada. Faça login novamente.', 'error');
      return;
    }

    try {
      const formattedData = formatFormDataForAPI(profileEdit.fields);
      const payload = {
        ...formattedData,
        email: user.email, // Manter email inalterado
      };

      const response = await request.put(`/usuarios/${userId}`, payload);
      const updatedUser = response.data;

      // Atualizar dados locais
      const localData = getUserData();
      saveUserData({ ...localData, ...updatedUser });

      // Forçar recarga dos dados do usuário na interface
      refreshUser();

      Swal.fire({
        icon: 'success',
        title: 'Dados salvos com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });

      profileEdit.resetForm();
    } catch (err) {
      console.error('Erro ao salvar:', err);
      Swal.fire('Erro', 'Não foi possível salvar as alterações.', 'error');
    }
  };

  const handleCancelEdit = () => {
    profileEdit.handleToggleEditMode();
  };

  return (
    <ProfileView
      user={user}
      isEditMode={profileEdit.isEditMode}
      fields={profileEdit.fields}
      errors={profileEdit.errors}
      onToggleEditMode={profileEdit.handleToggleEditMode}
      onLogout={handleLogout}
      onChange={profileEdit.handleFieldChange}
      onSubmit={handleSubmit}
      onCancelEdit={handleCancelEdit}
    />
  );
}
