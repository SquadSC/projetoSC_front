import * as React from 'react';
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ProductList } from '../components/product-list.component';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';

// componente principal da tela de produtos
export function ProductsView({
  products, // lista de produtos filtrados
  isLoading, // indica se está carregando dados
  searchQuery, // termo de busca atual
  onSearch, // função para atualizar busca
  onEditProduct, // função para editar produto
  onToggleStatus, // remover produto
  showInactive,
  onShowInactiveChange,
}) {
  // hook para navegação entre rotas
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        p: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'end',
        }}
      >
        <PageHeader
          titulo='Catálogo de Produtos'
          showBackButton={true}
        ></PageHeader>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <AddCircleOutlineIcon
            color='primary'
            onClick={() => navigate(ROUTES_PATHS.ADD_PRODUCT)}
            aria-label='adicionar produto'
            sx={{
              width: 34, // aumenta o tamanho do botão
              height: 34, // aumenta o tamanho do botão
              '&:hover': {
                backgroundColor: 'rgba(56, 9, 13, 0.04)', // cor do hover mais suave
              },
            }}
          ></AddCircleOutlineIcon>
        </Box>
      </Box>

      {/* Conteúdo da pagina */}
      <Container sx={{ p: 0 }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder='Busque produtos ou categorias...'
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='action' />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: 'background.default',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        {/* checkbox de filtro por produtos inativos */}
        <FormControlLabel
          control={
            <Checkbox
              checked={showInactive}
              onChange={onShowInactiveChange}
              color='primary'
            />
          }
          label='Mostrar itens inativos'
          sx={{ mt: 1, color: 'text.secondary' }}
        />

        <Box>
          <Typography
            variant='h5'
            fontWeight={600}
            sx={{ mt: 4, color: 'primary.main' }}
          >
            Produtos Cadastrados
          </Typography>
        </Box>

        {/* Product List */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : products.length > 0 ? (
          <ProductList
            products={products}
            onEditProduct={onEditProduct}
            onDeleteProduct={onToggleStatus}
          />
        ) : (
          <Typography
            variant='text'
            sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}
          >
            {searchQuery
              ? 'Nenhum produto encontrado para esta busca.'
              : 'Nenhum produto cadastrado.'}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
