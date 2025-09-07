import Slider from 'react-slick';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FeedbackCard } from './feedback-card.component';
import PropTypes from 'prop-types';

// Componente para a seta "Anterior" com novo estilo
function PrevArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '65%', 
        left: '30%', 
        transform: 'translate(-50%, -50%)', 
        zIndex: 2,
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        color: (theme) => theme.palette.primary.main,
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}

// Componente para a seta "Próximo"
function NextArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '65%',
        right: '30%',
        transform: 'translate(50%, -50%)',
        zIndex: 2,
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        color: (theme) => theme.palette.primary.main,
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

export function FeedbackCarousel({ feedbacks }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Mostra só 1 slide
    slidesToScroll: 1,
    arrows: true, // Garante que as setas sejam renderizadas
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '350px', 
        mx: 'auto',
        my: 4,
      }}
    >
      <Slider {...settings}>
        {feedbacks.map((feedback) => (
          <Box key={feedback.id}>
            <FeedbackCard
              quote={feedback.quote}
              authorName={feedback.authorName}
              authorInfo={feedback.authorInfo}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

FeedbackCarousel.propTypes = {

};