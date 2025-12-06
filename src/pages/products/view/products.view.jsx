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
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ProductList } from '../components/product-list.component';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { BottomNavigationComponent } from '../../../components/bottomNavigation/bottom-navigation.component';


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
      }}
    >
      <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        {/* Primeira linha: Seta de voltar e ícone de adicionar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => navigate(-1)}
            sx={{ color: 'primary.main' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          
          <IconButton
            edge='end'
            color='inherit'
            onClick={() => navigate(ROUTES_PATHS.ADD_PRODUCT)}
            sx={{ 
              color: 'primary.main',
              width: 48,
              height: 48,
            }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: 34 }} />
          </IconButton>
        </Box>

        {/* Segunda linha: Título */}
        <Typography
          variant='h5'
          sx={{
            textAlign: 'center',
            color: 'primary.main',
            fontWeight: 'semiBold',
          }}
        >
          Catálogo de Produtos
        </Typography>
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
      <BottomNavigationComponent />
    </Box>
    
  );
}
