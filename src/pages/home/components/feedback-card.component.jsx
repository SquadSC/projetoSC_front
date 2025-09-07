import { Box, Typography, Stack, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Ícone de pessoa padrão
import PropTypes from 'prop-types';

export function FeedbackCard({ quote, authorName, authorInfo }) {
  return (
    <Box 
      sx={{ 
        p: 1, // Padding externo para o espaçamento do carrossel
      }}
    >
      <Stack
        spacing={2}
        sx={{
          border: (theme) => `2px solid ${theme.palette.primary.main}`,
          borderRadius: '24px',
          p: 3, // Padding interno do card
          height: '100%',
          minHeight: '280px', // Altura mínima para consistência
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          "{quote}"
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'grey.300' }}>
            <PersonIcon sx={{ color: 'grey.600' }}/>
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {authorName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {authorInfo}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

FeedbackCard.propTypes = {
  quote: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorInfo: PropTypes.string,
};