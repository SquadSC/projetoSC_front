import { Box } from '@mui/material';

export function GradientLine() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '2px', // 2px ou 3px fica mais delicado que 5px
        background: 'linear-gradient(90deg, #CDA243 0%, #F3E4AA 50.48%, #C59736 100%)',
      }}
    />
  );
}