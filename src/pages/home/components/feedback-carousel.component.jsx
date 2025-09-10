import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import { FeedbackCard } from './feedback-card.component';
import PropTypes from 'prop-types';

export const FeedbackCarousel = React.forwardRef(({ feedbacks }, ref) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // As setas serão controladas por fora
  };

  return (
    <Box 
      sx={{ 
        width: '75%',
        maxWidth: '350px', 
        mx: 'auto',
        my: 4,
      }}
    >
      <Slider ref={ref} {...settings}>
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
});

FeedbackCarousel.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quote: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
      authorInfo: PropTypes.string,
    })
  ).isRequired,
};