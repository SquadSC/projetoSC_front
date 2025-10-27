import { Typography, Box, IconButton } from '@mui/material';
import { useState } from 'react';
import theme from '../../../../theme';

export default function IngredientComponent({
  ingredient,
  isSelected,
  isDisabled,
  onClick,
  showPrice = false,
}) {
  const handleToggle = () => {
    if (!isDisabled || isSelected) {
      // Permite desativar mesmo se o limite foi atingido
      onClick();
    }
  };

  return (
    <Box display='flex' alignItems='center' mb={2}>
      <Typography
        sx={{
          color:
            isDisabled && !isSelected ? '#bbb' : theme.palette.primary.main,
          mr: 'auto',
        }}
      >
        {ingredient.nome}
      </Typography>
      <IconButton
        onClick={handleToggle}
        size='small'
        disabled={isDisabled && !isSelected}
        sx={{
          p: 1,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: isDisabled && !isSelected ? 'none' : 'scale(1.1)',
          },
          opacity: isDisabled && !isSelected ? 0.5 : 1,
        }}
      >
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: `2px solid ${
              isSelected ? theme.palette.primary.main : '#bbb'
            }`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition:
              'border-color 0.3s ease-in-out, transform 0.2s ease-in-out',
            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {isSelected && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                transition:
                  'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
                transform: 'scale(1)',
                animation: isSelected ? 'fadeIn 0.3s ease-in-out' : 'none',
                '@keyframes fadeIn': {
                  '0%': { opacity: 1, transform: 'scale(1)' },
                  '100%': { opacity: 1, transform: 'scale(1)' },
                },
              }}
            />
          )}
        </Box>
      </IconButton>
    </Box>
  );
}
