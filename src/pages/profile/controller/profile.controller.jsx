import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileView } from '../view/profile.view';
import { request } from '../../../services/api';
import { logout, getUserData, saveUserData } from '../../../utils/auth';
import { useUser } from '../../../hooks/use-user/useUser'; // Importe o hook
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import Swal from 'sweetalert2';
import { validateFields, validators, } from '../../../utils/field-validator/field-validator.utils';

export function ProfileController() {
    const navigate = useNavigate();
    const { getUserId, user } = useUser();

    const [isEditMode, setIsEditMode] = useState(false); // Começa em modo de visualização
    const [displayUser, setDisplayUser] = useState({});
    const [fields, setFields] = useState({
        nome: '',
        telefone: '',
        dataNascimento: '',
    });
    const [errors, setErrors] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    const formatDateForInput = dateStr => {
        if (!dateStr) return '';
        try {
            if (dateStr.includes('/')) {
                const [day, month, year] = dateStr.split('/');
                if (day && month && year && year.length === 4) {
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
            }
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return '';
        } catch (e) {
            return '';
        }
    };

    const formatDateForDisplay = dateStr => {
        if (!dateStr) return 'Não informado';

        try {
            const datePart = dateStr.split('T')[0];
            const [year, month, day] = datePart.split('-');

            if (day && month && year) {
                return `${day}/${month}/${year}`;
            }
        } catch (e) {
            return new Date(dateStr).toLocaleDateString('pt-BR');
        }
        return dateStr;
    };


    useEffect(() => {

        if (!user || !user.id) {
            return;
        }

        const userId = user.id;

        request
            .get(`/usuarios/${userId}`)
            .then(response => {
                const data = response.data;
                setDisplayUser({
                    ...data,
                    dataNascimentoDisplay: formatDateForDisplay(data.dataNascimento),
                    memberSinceDisplay: formatDateForDisplay(data.dataCadastro),
                    totalPedidos: data.totalPedidos,
                });
                setFields({
                    nome: data.nome,
                    telefone: data.telefone,
                    dataNascimento: formatDateForInput(data.dataNascimento),
                });
                setAvatarPreview(data.avatarUrl || null);
            })
            .catch(err => {
                console.error('Erro ao buscar usuário:', err);
                Swal.fire(
                    'Erro',
                    'Não foi possível carregar os dados do perfil.',
                    'error',
                );
            });
    }
        , [user]);


    // Chamada ao clicar no botão Editar ou Cancelar 
    const handleToggleEditMode = () => {
        if (isEditMode) {
            const userId = user?.id;;
            if (!userId) return;
            request.get(`/usuarios/${userId}`).then(response => {
                const data = response.data;
                // Resetando os 'fields', o preview do avatar para os valores originais
                setFields({
                    nome: data.nome,
                    telefone: data.telefone,
                    dataNascimento: formatDateForInput(data.dataNascimento),
                });
                setAvatarPreview(data.avatarUrl || null);
                setErrors({});
            });
        }
        setIsEditMode(prev => !prev);
    };

    // Chamada ao clicar no botão "Sair"
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

    // --- Funções de Edição ---

    // Chamada sempre que o valor de um input MUDAR
    const handleChange = e => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const profileValidators = {
            nome: validators.name,
            telefone: validators.phone,
        };
        const newErrors = validateFields(fields, profileValidators);
        if (!fields.dataNascimento) {
            newErrors.dataNascimento = 'Data de nascimento é obrigatória.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Chamada ao clicar no botão "Salvar Mudanças"
    const handleSubmit = e => {
        e.preventDefault();
        if (!validate()) return;

        const userId = user?.id;
        if (!userId) {
            Swal.fire('Erro', 'Sessão expirada. Faça login novamente.', 'error');
            return;
        }
        const payload = {
            ...fields,
            avatarUrl: avatarPreview,
            email: displayUser.email,
        };


        request
            .put(`/usuarios/${userId}`, payload)
            .then(response => {
                const data = response.data;
                setDisplayUser({
                    ...displayUser,
                    ...data,
                    dataNascimentoDisplay: formatDateForDisplay(data.dataNascimento),
                    memberSinceDisplay: formatDateForDisplay(data.dataCadastro),
                });
                const localData = getUserData();
                saveUserData({ ...localData, ...data });

                Swal.fire({
                    icon: 'success',
                    title: 'Dados salvos com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsEditMode(false);
            })
            .catch(err => {
                console.error('Erro ao salvar:', err);
                Swal.fire('Erro', 'Não foi possível salvar as alterações.', 'error');
            });
    };

    // --- Funções do Avatar ---
    // Chamada ao clicar no ícone de editar sobre o avatar
    const handleAvatarClick = () => {
        if (isEditMode) {
            // Usando a referência 'fileInputRef' para simular um clique no input escondido
            fileInputRef.current.click();
        }
    };

    // Chamada QUANDO o usuário seleciona um arquivo no input type="file
    const handleAvatarChange = event => {
        const file = event.target.files[0];
        if (!file) return;

        // Validações básicas do arquivo
        if (!file.type.startsWith('image/')) {
            Swal.fire('Erro', 'Por favor, selecione um arquivo de imagem.', 'error');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            Swal.fire('Erro', 'A imagem é muito grande (Máx 5MB).', 'error');
            return;
        }

        // Usado para ler o conteúdo de arquivos no navegador.
        const reader = new FileReader();
        reader.onloadend = () => {
            // 'reader.result' contém a imagem lida como uma string base64
            // Atualiza o estado, fazendo a imagem aparecer na tela
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <ProfileView
            user={displayUser}
            isEditMode={isEditMode}
            fields={fields}
            errors={errors}
            onToggleEditMode={handleToggleEditMode}
            onLogout={handleLogout}
            onChange={handleChange}
            onSubmit={handleSubmit}
            avatarPreview={avatarPreview}
            fileInputRef={fileInputRef}
            onAvatarClick={handleAvatarClick}
            onAvatarChange={handleAvatarChange}
        />
    );
}