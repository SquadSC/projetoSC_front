import Slider from 'react-slick';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CakeCard } from './cake-card.component';
import { PrevArrow, NextArrow } from './carousel-arrows.component';
import PropTypes from 'prop-types';

// // Componente para a seta "Anterior"
// function PrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <IconButton
//       onClick={onClick}
//       sx={{
//         position: 'absolute',
//         top: '55%', // Alinha verticalmente ao meio
//         left: '30%', // Posiciona à esquerda, fora da área dos cards
//         zIndex: 2,
//         transform: 'translateY(-50%)',
//         color: theme => theme.palette.primary.main,
//         border: theme => `2px solid ${theme.palette.primary.main}`,
//       }}
//     >
//       <ArrowBackIosNewIcon />
//     </IconButton>
//   );
// }

// // Componente para a seta "Próximo"
// function NextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <IconButton
//       onClick={onClick}
//       sx={{
//         position: 'absolute',
//         top: '55%', // Alinha verticalmente ao meio
//         right: '30%', // Posiciona à direita, fora da área dos cards
//         zIndex: 2,
//         transform: 'translateY(-50%)',
//         color: theme => theme.palette.primary.main,
//         border: theme => `2px solid ${theme.palette.primary.main}`
//       }}
//     >
//       <ArrowForwardIosIcon />
//     </IconButton>
//   );
// }

export function CakeCarousel({ cakes }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, // Para dar o efeito de centralizado
    variableWidth: true, // Importante para larguras diferentes
    className: "center", // Adiciona uma classe para estilização customizada
    centerPadding: "60px", // cria espaço nas laterais
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative', //  ponto de referência para as setas
        pb: 6, // padding embaixo para criar espaço para as setas
        maxWidth: '400px',
        height: '60dvh',
        mx: 'auto',
        py: 4,
      }}
    >
      <Box sx={{ width: '100%', mx: 'auto', height: '100%', }}>
        <Slider {...settings}>
          {cakes.map(cake => (
            <Box key={cake.id} sx={{ width: '280px !important' }}>
              <CakeCard
                image={cake.image}
                title={cake.title}
                description={cake.description}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
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