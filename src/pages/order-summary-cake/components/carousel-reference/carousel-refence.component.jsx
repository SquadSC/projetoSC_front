import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import { Box, Typography, CircularProgress } from '@mui/material';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

export function CarouselReferenceComponent({ refImages }) {
  const { images, loading, error, refetch } = refImages;

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
    <Box sx={{
      width: '100%',
      mt: 2,
      "& .swiper-pagination-bullet": {
        backgroundColor: "#b2bec3",
        opacity: 1,
      },
      "& .swiper-pagination-bullet-active": {
        backgroundColor: "primary.main",
      },
    }}>
      <Typography
        variant='subtitle1'
        fontWeight={'fontWeightSemiBold'}
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
          paddingBottom: '40px', // espaço p/ bullets
        }}
      >
        {images.map((ref, index) => (
          <SwiperSlide key={ref.id_anexo || index}>
            <Box
              sx={{
                width: '100%', // deixa o Swiper calcular a largura
                height: '100%',
                border: '1px solid #ddd',
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <img
                src={ref.imagem_anexo}
                alt={ref.nome_arquivo}
                style={{
                  width: '100%',
                  height: '80%',
                  objectFit: 'cover',
                }}
                onError={e => {
                  e.target.style.display = 'none';
                }}
              />
              <Typography
                variant='caption'
                sx={{
                  p: 0.5,
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  height: '20%',
                  overflow: 'hidden',
                }}
              >
                {ref.nome_arquivo}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
