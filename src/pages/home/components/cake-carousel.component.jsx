import React from 'react'; // 👈 Importe o React para usar a ref
import Slider from 'react-slick';
import { Box, Stack } from '@mui/material';
import { CakeCard } from './cake-card.component';
import { PrevArrow, NextArrow } from './carousel-arrows.component'; // Suas setas reutilizáveis
import PropTypes from 'prop-types';

export function CakeCarousel({ cakes }) {
  const sliderRef = React.useRef(null);

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };
  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    arrows: false, // nao renderizar as setas padrao dele

    responsive: [
      {
        breakpoint: 1024, // Para telas de até 1024px (tablets)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Para telas de até 600px (celulares)
        settings: {
          slidesToShow: 1,
          centerMode: true, // Reativamos o centerMode e padding só no celular
          centerPadding: '40px',
        },
      },
    ],
  };

  return (
    // Um Stack principal para organizar o slider e as setas verticalmente
    <Stack sx={{ width: '100%', alignItems: 'center' }}>
      {/* Container do Slider */}
      <Box sx={{ width: '100%', maxWidth: '500px' }}>
        <Slider ref={sliderRef} {...settings}>
          {cakes.map(cake => (
            <Box key={cake.id}>
              <CakeCard
                image={cake.image}
                title={cake.title}
                description={cake.description}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Renderizando as setas manualmente aqui embaixo */}
      <Stack
        direction='row'
        spacing={2}
        justifyContent='center'
        sx={{ mt: 2 }} // Margem acima das setas
      >
        <PrevArrow onClick={handlePrev} />
        <NextArrow onClick={handleNext} />
      </Stack>
    </Stack>
  );
}

CakeCarousel.propTypes = {
  cakes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
