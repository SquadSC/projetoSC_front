import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { CustomTextField } from '../../../../components/text-field/text-field.component';
import { CepField } from '../cep-field/cep-field.component';

export function NewAddressComponent({
  fields,
  errors,
  onChange,
  onSubmit,
  onBack,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Container
        sx={{
          p: 3,
        }}
      >
        <Typography variant='text' sx={{ mb: 2 }}>
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
            onChange={e => onChange('bairro', e.target.value)}
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
            sx={{ width: '100%', height: '48px', mt: 1 }}
          >
            Cadastrar Endereço
          </Button>
          <Button
            type='button'
            variant='outlined'
            sx={{ width: '100%', height: '48px', mt: 1 }}
            onClick={onBack}
          >
            Voltar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
