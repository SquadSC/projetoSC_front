import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { CakeCard } from './cake-card.component';
import { PrevArrow, NextArrow } from './carousel-arrows.component';
import PropTypes from 'prop-types';

export function CakeCarousel({ cakes }) {
  const sliderRef = React.useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Estado para forçar re-render quando o slider precisar ser atualizado
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Força um re-render do slider quando o tamanho da tela mudar
    setKey(prevKey => prevKey + 1);
  }, [isMobile, isTablet]);

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    centerMode: isMobile,
    centerPadding: isMobile ? '40px' : '0px',
    arrows: false,
    adaptiveHeight: true,
    initialSlide: 0,
  };

  return (
    // Um Stack principal para organizar o slider e as setas verticalmente
    <Stack sx={{ width: '100%', alignItems: 'center' }}>
      {/* Container do Slider */}
      <Box sx={{ width: '100%', maxWidth: isMobile ? '100%' : '800px' }}>
        <Slider key={key} ref={sliderRef} {...settings}>
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
