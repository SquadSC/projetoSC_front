import { Typography, Box, IconButton } from "@mui/material";
import { useState } from "react";
import theme from '../../../theme'

export default function IngredientComponent({ id, item, active, onToggle, disabled }) {
    
    const handleToggle = () => {
        if (!disabled || active) { // Permite desativar mesmo se o limite foi atingido
            onToggle(id);
        }
    };

    return (
        <Box display="flex" alignItems="center" mb={2}>
            <Typography 
                sx={{ 
                    color: disabled && !active ? '#bbb' : theme.palette.primary.main, 
                    mr: 'auto' 
                }}
            >
                {item.nome}
            </Typography>
            <IconButton 
                onClick={handleToggle}
                size="small"
                disabled={disabled && !active}
                sx={{
                    p: 1,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: disabled && !active ? 'none' : 'scale(1.1)'
                    },
                    opacity: disabled && !active ? 0.5 : 1
                }}
            >
                <Box
                    sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: `2px solid ${active ? theme.palette.primary.main : '#bbb'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'border-color 0.3s ease-in-out, transform 0.2s ease-in-out',
                        transform: active ? 'scale(1.1)' : 'scale(1)'
                    }}
                >
                    {active && (
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: theme.palette.primary.main,
                                transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
                                transform: 'scale(1)',
                                animation: active ? 'fadeIn 0.3s ease-in-out' : 'none',
                                '@keyframes fadeIn': {
                                    '0%': { opacity: 1, transform: 'scale(1)' },
                                    '100%': { opacity: 1, transform: 'scale(1)' }
                                }
                            }}
                        />
                    )}
                </Box>
            </IconButton>
        </Box>
    );
}