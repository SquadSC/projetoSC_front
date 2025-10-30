import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileView } from '../view/profile.view';
import { request } from '../../../services/api';
import { logout, getUserData, saveUserData } from '../../../utils/auth';
import { useUser } from '../../../hooks/use-user/useUser';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import Swal from 'sweetalert2';
import {
    validateFields,
    validators,
} from '../../../utils/field-validator/field-validator.utils';

export function ProfileController() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [isEditMode, setIsEditMode] = useState(false);

    const [fields, setFields] = useState({
        nome: '',
        telefone: '',
        dataNascimento: '',
    });
    const [displayUser, setDisplayUser] = useState({});
    const [errors, setErrors] = useState({});

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const fileInputRef = useRef(null);

    // --- Funções de Formatação ---
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
        } catch (e) { return ''; }
    };

    const formatDateForDisplay = dateStr => {
         if (!dateStr) return 'Não informado';
         if (typeof dateStr === 'string' && dateStr.includes('-')) {
            const parts = dateStr.split('T')[0].split('-'); // Pega só a parte da data e divide
            if (parts.length === 3) {
                const [year, month, day] = parts;
                // Retorna no formato DD/MM/YYYY
                return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
            }
        }
        try {
            const dateObject = new Date(dateStr);
            if (isNaN(dateObject.getTime())) {
                return 'Data inválida';
            }
            return dateObject.toLocaleDateString('pt-BR');
        }
        catch (e) {
            return 'Data inválida';
        }
    };

    // --- Carregamento dos Dados ---
    useEffect(() => {
        if (user) {
            const userId = user.id;

            // CORREÇÃO: Endpoint ajustado para /usuarios/{id}
            request
                .get(`/usuarios/${userId}`) //
                .then(response => {
                    
                    const data = response.data;

                    const displayData = {
                        nome: data.nome,
                        email: data.email,
                        telefone: data.telefone,
                        dataNascimento: data.dataNascimento,
                        avatarUrl: data.avatarUrl, 
                        createdAt: data.dataUltimoLogin,
                    };

                    setDisplayUser({
                        ...displayData,
                        dataNascimentoDisplay: formatDateForDisplay(displayData.dataNascimento),
                        memberSinceDisplay: formatDateForDisplay(displayData.createdAt),
                    });
                    setFields({
                        nome: displayData.nome,
                        telefone: displayData.telefone,
                        dataNascimento: formatDateForInput(displayData.dataNascimento),
                    });
                    setAvatarPreview(displayData.avatarUrl || null);
                })
                .catch(err => {
                    console.error('Erro ao buscar usuário:', err);
                    Swal.fire('Erro', 'Não foi possível carregar os dados do perfil.', 'error');
                });
        }
    }, [user]);

    // --- Funções de Ação ---
    const handleToggleEditMode = () => {
        if (isEditMode) {
            const userId = user.id;
            // CORREÇÃO: Endpoint ajustado para /usuarios/{id}
            request.get(`/usuarios/${userId}`).then(response => { //
                const data = response.data;
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

    // --- Funções do Avatar ---
    const handleAvatarChange = event => {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            Swal.fire('Erro', 'Por favor, selecione um arquivo de imagem.', 'error');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            Swal.fire('Erro', 'A imagem é muito grande (Máx 5MB).', 'error');
            return;
        }
        setAvatarFile(file); // Salva o ARQUIVO
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result); // Salva o PREVIEW
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarClick = () => {
        if (isEditMode) {
            fileInputRef.current.click();
        }
    };

    // --- Submit (Lógica de API Real) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const userId = user.id;
        let finalAvatarUrl = avatarPreview;

        try {
            // ETAPA 1: Upload do Avatar (se um novo arquivo foi selecionado)
            if (avatarFile) {
                const formData = new FormData();
                formData.append('file', avatarFile);

                // AVISO: Estou mantendo a suposição do endpoint '/anexos/upload'
                // Verifique se ele existe no seu back-end!
                const uploadResponse = await request.post('/anexos/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                finalAvatarUrl = uploadResponse.data.url; // Ajuste se o back-end retornar outro nome
            }

            // ETAPA 2: Update dos Dados do Usuário
            // O DTO (payload) usa os nomes da entidade (nome, telefone),
            // que o seu back-end já espera!
            const payload = {
                nome: fields.nome,
                telefone: fields.telefone,
                dataNascimento: fields.dataNascimento,
                avatarUrl: finalAvatarUrl,
            };

            // CORREÇÃO: Endpoint ajustado para /usuarios/{id} e método PUT
            const updateResponse = await request.put(`/usuarios/${userId}`, payload); //

            // --- Sucesso ---
            const data = updateResponse.data;

            const updatedData = {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                dataNascimento: data.dataNascimento,
                avatarUrl: data.avatarUrl,
                createdAt: data.dataUltimoLogin,
            };

            setDisplayUser({
                ...updatedData,
                dataNascimentoDisplay: formatDateForDisplay(updatedData.dataNascimento),
                memberSinceDisplay: formatDateForDisplay(updatedData.createdAt),
            });

            // Atualiza o localStorage
            const localData = getUserData();
            saveUserData({
                ...localData, // Mantém o token
                nome: updatedData.nome,
                email: updatedData.email,
                telefone: updatedData.telefone,
                avatarUrl: updatedData.avatarUrl
            });

            Swal.fire('Sucesso!', 'Dados salvos com sucesso!', 'success');
            setIsEditMode(false);
            setAvatarFile(null);

        } catch (err) {
            console.error('Erro ao salvar:', err);
            Swal.fire('Erro', 'Não foi possível salvar as alterações.', 'error');
        }
    };

    // --- Renderização ---
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