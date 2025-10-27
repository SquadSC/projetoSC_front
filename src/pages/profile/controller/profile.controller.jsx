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
    // Controla se a tela está no modo de visualização ou edição
    const [isEditMode, setIsEditMode] = useState(false); // Começa em modo de visualização

    // --- Estados dos dados ---
    // Guarda os dados do usuário FORMATADOS para exibição na tela (View Mode)
    const [displayUser, setDisplayUser] = useState({});

    // Guarda os valores ATUAIS dos campos do formulário (Edit Mode)
    const [fields, setFields] = useState({
        nome: '',
        telefone: '',
        dataNascimento: '',
    });
    const [errors, setErrors] = useState({});

    // --- Estados do Avatar ---
    // Guarda a URL de preview da imagem do avatar selecionada
    const [avatarPreview, setAvatarPreview] = useState(null);
    // useRef cria uma "referência" a um elemento da tela (DOM). Útil para interagir
    // diretamente com ele, como clicar em um input escondido.
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
        } catch (e) {
            return '';
        }
    };

    const formatDateForDisplay = dateStr => {
        if (!dateStr) return 'Não informado';
        if (dateStr.includes('-')) {
            const [year, month, day] = dateStr.split('-');
            if (day && month && year) {
                return `${day}/${month}/${year}`;
            }
        }
        return new Date(dateStr).toLocaleString('pt-BR');
    };


    // --- Carregamento dos Dados ---
    // Este useEffect busca os dados do usuário da API QUANDO o 'user' for carregado
    // E pega o ID do usuário (ou usa 1 se não encontrar, para o json-server funcionar)
    useEffect(() => {
       
            const userId = 1;

            request
                .get(`/usuarios/${userId}`)
                .then(response => {
                    const data = response.data;
                    // Atualiza o estado 'displayUser' com os dados formatados para visualização
                    setDisplayUser({
                        ...data,
                        dataNascimentoDisplay: formatDateForDisplay(data.dataNascimento),
                        memberSinceDisplay: formatDateForDisplay(data.createdAt),
                    });
                    // Também atualiza o estado 'fields' com os dados para as inputs de edição
                    setFields({
                        nome: data.nome,
                        telefone: data.telefone,
                        dataNascimento: formatDateForInput(data.dataNascimento),
                    });
                    // Atualiza o preview do avatar com a URL salva (se existir)
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


    // --- Funções de Ação ---
    // Chamada ao clicar no botão Editar ou Cancelar 
    const handleToggleEditMode = () => {
        // Se estava editando e clicou em "Cancelar"
        if (isEditMode) {
            // Recarrega os dados originais para descartar mudanças não salvas
            const userId = 1;
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
        // Invertendo o estado 'isEditMode' (true vira false, false vira true)
        setIsEditMode(prev => !prev);
    };

    // Chamada ao clicar no botão "Sair"
    const handleLogout = () => {
        // Mostra um pop-up de confirmação
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
                logout(); // Chama a função que limpa o localStorage
                navigate(ROUTES_PATHS.LOGIN);
            }
        });
    };

    // --- Funções de Edição ---

    // Chamada sempre que o valor de um input MUDAR
    const handleChange = e => {
        // Pega o nome e valor da input que disparou o evento
        const { name, value } = e.target;
        // Atualiza o estado 'fields', modificando APENAS a propriedade alterada
        setFields(prev => ({ ...prev, [name]: value }));
    };

    // Função para validar TODOS os campos do formulário (chamada antes de salvar)
    const validate = () => {
        // Definindo quais validadores do arquivo utils usar para cada campo
        const profileValidators = {
            nome: validators.name,
            telefone: validators.phone,
        };
        const newErrors = validateFields(fields, profileValidators);
        // Adicionando validação específica para data
        if (!fields.dataNascimento) {
            newErrors.dataNascimento = 'Data de nascimento é obrigatória.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Chamada ao clicar no botão "Salvar Mudanças"
    const handleSubmit = e => {
        e.preventDefault();
        // Roda a validação. Se houver erros interrompe a função
        if (!validate()) return;

        const userId =  1;
        // Cria o objeto com os dados a serem enviados para a API
        // Inclui os campos do estado 'fields' e a URL de preview do avatar
        const payload = {
            ...fields,
            avatarUrl: avatarPreview,
        };


        request
            .patch(`/usuarios/${userId}`, payload)
            .then(response => {
                const data = response.data;
                // Atualiza o estado 'displayUser' para refletir as mudanças na tela de visualização
                setDisplayUser({
                    ...data,
                    dataNascimentoDisplay: formatDateForDisplay(data.dataNascimento),
                    memberSinceDisplay: formatDateForDisplay(data.createdAt),
                });
                // Atualiza também o localStorage para que, se o usuário der F5, os dados novos permaneçam
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