import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import { Box, Typography, CircularProgress } from '@mui/material';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

export function CarouselReferenceComponent({
  refImages,
  selectedImage,
  onImageSelect,
}) {
  const { images, loading, error } = refImages;

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='300px'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign='center' p={3}>
        <Typography color='error'>
          Erro ao carregar referências: {error}
        </Typography>
      </Box>
    );
  }

  if (!images || images.length === 0) {
    return (
      <Box textAlign='center' p={3}>
        <Typography>Nenhuma referência disponível no momento.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        mt: 5,
        '& .swiper-pagination-bullet': {
          backgroundColor: '#b2bec3',
          opacity: 1,
        },
        '& .swiper-pagination-bullet-active': {
          backgroundColor: 'primary.main',
        },
        zIndex: 0,
      }}
    >
      <Typography
        variant='subtitle1'
        fontWeight={'semiBold'}
        color='primary.main'
        mb={2}
      >
        Referências disponíveis:
      </Typography>

      <Swiper
        modules={[Grid, Pagination]}
        slidesPerView={2}
        grid={{ rows: 2, fill: 'row' }}
        spaceBetween={10}
        pagination={{ clickable: true }}
        style={{
          width: '100%',
          height: '380px',
          paddingBottom: '40px',
        }}
      >
        {images.map((ref, index) => {
          const isSelected = selectedImage?.id_anexo === ref.id_anexo;

          return (
            <SwiperSlide key={ref.id_anexo || index}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  border: isSelected ? '2px solid' : '1px solid #ddd',
                  borderColor: isSelected ? 'primary.main' : '#ddd',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
                onClick={() => {
                  onImageSelect && onImageSelect(ref);
                }}
              >
                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      zIndex: 1,
                    }}
                  >
                    ✓
                  </Box>
                )}

                <img
                  src={ref.imagem_anexo}
                  alt={ref.nome_arquivo}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                  }}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
