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

export function AddProductView({ fields, onChange, onSubmit, isLoading, isAddingIngredient }) {
  const mainCategoryOptions = [
    { value: 'componente-bolo', label: 'Componente de Bolo' },
    { value: 'itens-complementares', label: 'Itens Complementares' },
  ];

  const subCategoryOptions = {
    'componente-bolo': ['Massa', 'Recheio', 'Adicional'],
    'itens-complementares': ['Doces', 'Salgados', 'Sobremesas'],
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', p: 3, }}>
      {/* Header */}
        <PageHeader
          titulo='Adicionar Produto'
          showBackButton={true}
          width='100%'
        ></PageHeader>

      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Typography variant="h6" color="primary" fontWeight="fontWeightSemiBold" sx={{ mb: 2 }}>
          Informações do Produto
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Select Principal */}
          <FormControl fullWidth>
            <InputLabel id="main-category-label">Categoria do Produto</InputLabel>
            <Select
              labelId="main-category-label"
              name="mainCategory"
              value={fields.mainCategory}
              label="Categoria do Produto"
              onChange={onChange}
            >
              {mainCategoryOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select Secundário (Condicional) */}
          {fields.mainCategory && (
            <FormControl fullWidth>
              <InputLabel id="sub-category-label">Tipo / Categoria Específica</InputLabel>
              <Select
                labelId="sub-category-label"
                name="subCategory"
                value={fields.subCategory}
                label="Tipo / Categoria Específica"
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
            name="name"
            label="Nome do Produto"
            value={fields.name}
            onChange={onChange}
            fullWidth
          />
          
          <TextField
            name="price"
            label="Preço do Produto (R$)"
            type="number"
            value={fields.price}
            onChange={onChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                name="isPremium"
                checked={fields.isPremium}
                onChange={onChange}
                color="primary"
              />
            }
            label="É um item premium"
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large" 
            sx={{ py: 1.5 }}
            disabled={isLoading}
          >
            {isLoading ? 'Criando...' : 'Criar Produto'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}