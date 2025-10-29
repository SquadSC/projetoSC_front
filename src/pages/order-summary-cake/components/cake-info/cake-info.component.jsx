import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CustomTextField } from '../../../../components/text-field/text-field.component';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { CarouselReferenceComponent } from '../carousel-reference/carousel-refence.component';

export function CakeInfoComponent({
  nextStep,
  cakeData,
  imageData,
  canAdvance,
}) {
  const {
    theme,
    uploadedFile,
    uploadPreview,
    uploading,
    selectedCarouselImage,
    selectedImage,
    errors,
    isValid,
    fileInputRef,
    handleThemeChange,
    handleFileUpload,
    handleCarouselImageSelect,
    removeImage,
    openFileSelector,
  } = cakeData.themeAndImage;

  return (
    <Box display='flex' flexDirection='column'>
      <Container sx={{ p: 2 }}>
        <Stack spacing={3}>
          {/* Campo de Tema */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography
              variant='subTitleLittle'
              color='primary.main'
              fontWeight='semiBold'
            >
              Qual vai ser o tema?
            </Typography>

            <CustomTextField
              label='Tema do bolo (opcional):'
              type='text'
              value={theme}
              onChange={e => handleThemeChange(e.target.value)}
              error={!!errors.theme}
              helperText={errors.theme}
              fullWidth
              placeholder='Ex: Aniversário infantil, Casamento, etc.'
            />
          </Box>

          {/* Carrossel de Referências */}
          <Box>
            <CarouselReferenceComponent
              refImages={imageData}
              selectedImage={selectedCarouselImage}
              onImageSelect={handleCarouselImageSelect}
            />
          </Box>

          {/* Upload de Imagem Personalizada */}
          <Box>
            <Typography
              variant='subtitle1'
              fontWeight='semiBold'
              color='primary.main'
              sx={{ mb: 2 }}
            >
              Ou anexe sua própria referência:
            </Typography>

            {/* Mostra preview da imagem uploadada */}
            {uploadPreview && (
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
                    src={uploadPreview}
                    alt='Preview da referência'
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      objectFit: 'contain',
                      borderRadius: 8,
                    }}
                  />
                </Box>

                {uploadedFile && (
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ mt: 1, display: 'block' }}
                  >
                    {uploadedFile.name} (
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                )}
              </Paper>
            )}

            {/* Botão de Upload */}
            <Button
              variant='outlined'
              color='primary'
              sx={{
                width: '100%',
                height: '48px',
              }}
              onClick={openFileSelector}
              disabled={uploading}
              startIcon={
                uploading ? (
                  <CircularProgress size={16} />
                ) : uploadPreview ? (
                  <ImageIcon />
                ) : (
                  <CloudUploadIcon />
                )
              }
            >
              {uploading
                ? 'Processando...'
                : uploadPreview
                ? 'Alterar Referência'
                : 'Anexar suas Referências'}
            </Button>

            {/* Input file escondido */}
            <input
              ref={fileInputRef}
              type='file'
              hidden
              accept='image/*'
              onChange={handleFileUpload}
            />

            {/* Mensagens de erro */}
            {errors.image && (
              <Typography
                variant='caption'
                color='error'
                sx={{ mt: 1, display: 'block' }}
              >
                {errors.image}
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

          {/* Informação sobre seleção */}
          {selectedImage && (
            <Alert severity='info' sx={{ mt: 2 }}>
              {selectedImage.source === 'upload'
                ? 'Você anexou uma imagem personalizada'
                : 'Você selecionou uma referência do carrossel'}
            </Alert>
          )}

          {/* Validação */}
          {!isValid && (
            <Alert severity='warning' sx={{ mt: 2 }}>
              Preencha o tema ou selecione/anexe uma imagem para continuar.
            </Alert>
          )}
        </Stack>

        {/* Botão Avançar */}
        <Button
          variant='contained'
          color='primary'
          sx={{
            width: '100%',
            height: '48px',
            mt: 4,
            borderRadius: '24px',
          }}
          onClick={nextStep}
          disabled={!canAdvance}
        >
          Avançar
        </Button>
      </Container>
    </Box>
  );
}
