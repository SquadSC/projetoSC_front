import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada-component';
import { StepperComponent } from '../../../components/stepper/stepper-component';
import { request } from '../../../utils/request';
import { CepField } from '../components/cep-field/cep-field.component';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
import { CustomTextField } from '../../../components/text-field/text-field.component';

const steps = ['Etapa 1', 'Etapa 2', 'Etapa 3'];

export function NewAddressView({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress,
  onConfirm,
  fields,
  errors,
  onChange,
  onSubmit,
  isCepLoading
}) {
  const navigate = useNavigate();

  return (
    // Box principal
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PageHeader titulo='' showBackButton={true} />
      <PageHeader titulo='Entrega do Pedido' showBackButton={false} />

      {/* Container principal que ocupa o espaço disponível */}
      <Container
        sx={{
          pt: 0,
          px: 3,
          pb: 3,
          flexGrow: 1,
          mb: '96px' /* Margem no fundo para não sobrepor o botão fixo */,
        }}
      >
        <StepperComponent
          steps={['Etapa 1', 'Etapa 2', 'Etapa 3']}
          activeStep={2}
        />
        <Typography variant='body1' sx={{ mb: 2 }}>
          Adicionando endereço de entrega
        </Typography>

        <Box
          component='form'
          onSubmit={onSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <CustomTextField
            label='Nome do Endereço (ex: Casa, Trabalho)'
            type='text'
            value={fields.nomeEndereco}
            onChange={e => onChange('nomeEndereco', e.target.value)}
            error={errors.nomeEndereco}
            helperText={errors.nomeEndereco}
          />
          <CepField
            label='CEP'
            type='text'
            value={fields.cep}
            onChange={e => onChange('cep', e.target.value)}
            error={errors.cep}
            helperText={errors.cep}
          />
          <CustomTextField
            label='Logradouro'
            type='text'
            value={fields.logradouro}
            onChange={e => onChange('logradouro', e.target.value)}
            error={errors.logradouro}
            helperText={errors.logradouro}
          />
          <CustomTextField
            label='Bairro'
            type='text'
            value={fields.bairro}
            onChange={e => onChange('bairro', e.g.target.value)}
            error={errors.bairro}
            helperText={errors.bairro}
          />

          <Stack direction='row' spacing={2}>
            <CustomTextField
              label='Cidade'
              type='text'
              value={fields.cidade}
              onChange={e => onChange('cidade', e.target.value)}
              error={errors.cidade}
              helperText={errors.cidade}
              fullWidth
            />
            <CustomTextField
              label='Estado'
              type='text'
              value={fields.estado}
              onChange={e => onChange('estado', e.target.value)}
              error={errors.estado}
              helperText={errors.estado}
              // Define uma largura fixa para o campo de estado
              sx={{ width: '150px' }}
            />
          </Stack>

          <CustomTextField
            label='Número'
            type='text'
            value={fields.numero}
            onChange={e => onChange('numero', e.target.value)}
            error={errors.numero}
            helperText={errors.numero}
          />
          <CustomTextField
            label='Complemento (Opcional)'
            type='text'
            value={fields.complemento}
            onChange={e => onChange('complemento', e.target.value)}
            error={errors.complemento}
            helperText={errors.complemento}
          />
          <CustomTextField
            label='Ponto de Referência (Opcional)'
            type='text'
            value={fields.pontoReferencia}
            onChange={e => onChange('pontoReferencia', e.target.value)}
            error={errors.pontoReferencia}
            helperText={errors.pontoReferencia}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ width: '100%', height: '48px', mt: 4 }}
          >
            Cadastrar Endereço
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
