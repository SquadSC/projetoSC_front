import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { CustomTextField } from '../../../../components/text-field/text-field.component';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { useRef } from 'react';
import { CarouselReferenceComponent } from '../carousel-reference/carousel-refence.component';

export function CakeInfoComponent({ nextStep, infoCake }) {
  const {
    product,
    setProduct,
    errors,
    setErrors,
    file,
    preview,
    uploading,
    handleFileChange,
    removeImage,
  } = infoCake;

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log('product', product);

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Container sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography
            variant='subtitle1'
            fontWeight={'fontWeightSemiBold'}
            color='primary.main'
          >
            Qual vai ser o tema?
          </Typography>

          <CustomTextField
            label='Tema do bolo (opcional):'
            type='text'
            value={product.theme}
            onChange={e => {
              setProduct({ ...product, theme: e.target.value });
              console.log(e.target.value);
            }}
            error={!!errors.theme}
            helperText={errors.theme}
            fullWidth
          />
        </Stack>

        <Box>
          <CarouselReferenceComponent references={product.references} />
        </Box>

        <Stack spacing={3} mt={4}>
          <Box>
            <Typography
              variant='subtitle1'
              fontWeight={'fontWeightSemiBold'}
              color='primary.main'
              mb={2}
            >
              Não encontrou as referências certas?
            </Typography>

            {preview && (
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2' color='text.secondary'>
                    Referência anexada:
                  </Typography>
                  <IconButton size='small' color='error' onClick={removeImage}>
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={preview}
                    alt='Preview da referência'
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      objectFit: 'contain',
                      borderRadius: 8,
                    }}
                  />
                </Box>

                {file && (
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ mt: 1, display: 'block' }}
                  >
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                )}
              </Paper>
            )}

            <Button
              variant='outlined'
              color='primary'
              sx={{
                width: '100%',
                height: '48px',
                position: 'relative',
              }}
              onClick={handleButtonClick}
              disabled={uploading}
              startIcon={
                uploading ? (
                  <CircularProgress size={16} />
                ) : preview ? (
                  <ImageIcon />
                ) : (
                  <CloudUploadIcon />
                )
              }
            >
              {uploading
                ? 'Processando...'
                : preview
                ? 'Alterar Referência'
                : 'Anexar suas Referências'}
            </Button>

            {/* Input file escondido */}
            <input
              ref={fileInputRef}
              type='file'
              hidden
              accept='image/*'
              onChange={handleFileChange}
            />

            {errors.attachment && (
              <Typography
                variant='caption'
                color='error'
                sx={{ mt: 1, display: 'block' }}
              >
                {errors.attachment}
              </Typography>
            )}

            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ mt: 1, display: 'block' }}
            >
              Formatos aceitos: JPG, PNG (máx. 5MB)
            </Typography>
          </Box>

          <Button
            variant='contained'
            color='primary'
            sx={{ width: '100%', height: '48px', mt: 4 }}
            onClick={nextStep}
          >
            Avançar
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
