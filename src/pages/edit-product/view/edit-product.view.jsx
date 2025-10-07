import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';

export function EditProductView({ fields, onChange, onSubmit, isLoading }) {
  const mainCategoryOptions = [
    { value: 'componente-bolo', label: 'Componente de Bolo' },
    { value: 'itens-complementares', label: 'Itens Complementares' },
    { value: 'tabela-precos', label: 'Tabela de Preços' },
  ];

  const subCategoryOptions = {
    'componente-bolo': ['Massa', 'Recheio', 'Adicional'],
    'itens-complementares': ['Doces', 'Salgados', 'Sobremesas'],
    'tabela-precos': ['Bolo Standard', 'Bolo Premium', 'Adicionais'],
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{ backgroundColor: 'background.default', minHeight: '100vh', p: 3 }}
    >
      {/* Header */}
      <PageHeader
        titulo='Editar Produto'
        showBackButton={true}
        width='100%'
      ></PageHeader>

      <Container maxWidth='sm' sx={{ mt: 3 }}>
        <Typography
          variant='h6'
          color='primary'
          fontWeight='semiBold'
          sx={{ mb: 2 }}
        >
          Informações do Produto
        </Typography>
        <Box
          component='form'
          onSubmit={onSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* Select Principal */}
          <FormControl fullWidth>
            <InputLabel id='main-category-label'>
              Categoria do Produto
            </InputLabel>
            <Select
              labelId='main-category-label'
              name='mainCategory'
              value={fields.mainCategory}
              label='Categoria do Produto'
              onChange={onChange}
            >
              {mainCategoryOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select Secundário (Condicional) - não aparece para tabela de preços */}
          {fields.mainCategory && fields.mainCategory !== 'tabela-precos' && (
            <FormControl fullWidth>
              <InputLabel id='sub-category-label'>
                Tipo / Categoria Específica
              </InputLabel>
              <Select
                labelId='sub-category-label'
                name='subCategory'
                value={fields.subCategory}
                label='Tipo / Categoria Específica'
                onChange={onChange}
              >
                {subCategoryOptions[fields.mainCategory].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            name='name'
            label='Nome do Produto'
            value={fields.name}
            onChange={onChange}
            fullWidth
          />

          <TextField
            name='price'
            label='Preço do Produto (R$)'
            type='number'
            value={fields.price}
            onChange={onChange}
            fullWidth
          />

          {/* Campo Unidade - aparece para itens complementares e tabela de preços */}
          {(fields.mainCategory === 'itens-complementares' ||
            fields.mainCategory === 'tabela-precos') && (
            <FormControl fullWidth>
              <InputLabel id='unidade-label'>Unidade de Medida</InputLabel>
              <Select
                labelId='unidade-label'
                name='unidade'
                value={fields.unidade}
                label='Unidade de Medida'
                onChange={onChange}
              >
                <MenuItem value='kg'>kg</MenuItem>
                <MenuItem value='unidade'>unidade</MenuItem>
              </Select>
            </FormControl>
          )}

          <FormControlLabel
            control={
              <Checkbox
                name='isPremium'
                checked={fields.isPremium}
                onChange={onChange}
                color='primary'
              />
            }
            label='É um item premium'
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            sx={{ py: 1.5 }}
          >
            Salvar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
