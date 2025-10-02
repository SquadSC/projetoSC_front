import { Typography, Box, IconButton, Container } from "@mui/material";
import { useState } from "react";
import IngredientComponent from "./IngredientComponent";
import theme from '../../../theme'

export function SectionComponent({ IngredientType, items, maxQuantity = 0, weight = 1 }) {
    const [selectedIngredients, setSelectedIngredients] = useState({});

    const handleToggle = (id) => {
        setSelectedIngredients(prev => {
            const newSelected = { ...prev };
            const isCurrentlySelected = newSelected[id];
            const currentCount = Object.keys(newSelected).filter(key => newSelected[key]).length;

            if (isCurrentlySelected) {
                delete newSelected[id];
            } else {

                if (maxQuantity === 0 || currentCount < maxQuantity) {
                    newSelected[id] = true;
                }
            }

            console.log(newSelected)
            return newSelected;
        });
    };

    const currentCount = Object.keys(selectedIngredients).filter(key => selectedIngredients[key]).length;
    const limitReached = currentCount >= maxQuantity && maxQuantity != 0;

    const totalPrice = items
        ? items
            .filter(item => selectedIngredients[item.idIngrediente])
            .reduce((total, item) => total + (5.5 * weight), 0)
        : 0;

    return (
        <>

            <Container  sx={{width: '100%', padding: 0, marginBottom: 1}}>
                <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main }} >
                    {IngredientType}
                    {maxQuantity > 0 && ` (Máximo: ${maxQuantity})`}
                </Typography>

                <Typography variant="caption">
                    {maxQuantity > 0
                        ? ''
                        : totalPrice > 0
                            ? `Adicional: +R$ ${totalPrice.toFixed(2)}`
                            : 'Nenhum adicional selecionado'
                    }
                </Typography>
            </Container>

            {items && items.map(item => (
                <IngredientComponent
                    key={item.idIngrediente}
                    id={item.idIngrediente}
                    item={item}
                    active={!!selectedIngredients[item.idIngrediente]}
                    onToggle={handleToggle}
                    disabled={limitReached && !selectedIngredients[item.idIngrediente]}
                />
            ))}
            
        </>
    );
}