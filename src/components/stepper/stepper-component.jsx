import { Stack, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { GradientLine } from '../gradient-line/gradient-line-component';

export function StepperComponent({ steps, activeStep }) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={8} // Espaçamento entre as etapas
      sx={{ my: 2 }} // Margem vertical para dar espaço
    >
      {steps.map((label, index) => {
        const isActive = index === activeStep;

        return (
          <Box key={label}>
            <Typography
              variant="body1"
              sx={{
                color: isActive ? 'text.primary' : 'text.disabled',
                paddingBottom: '4px',
                
            }}
            >
              {label}
            </Typography>
            {isActive && <GradientLine />}
          </Box>
        );
      })}
    </Stack>
  );
}

StepperComponent.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
};