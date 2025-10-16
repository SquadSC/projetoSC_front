import { Typography, Container } from "@mui/material";
import { useState, useEffect } from "react";
import IngredientComponent from "../ingredient/IngredientComponent";
import theme from "../../../../theme";

export function SectionComponent({ IngredientType, items, maxQuantity = 0, weight = 1, listaIngrediente, onSelectionChange, required = false, essentials, infoCake}) {
    
    const [product, setProduct] = infoCake
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    // Inicializa com os ingredientes da listaIngrediente que pertencem a esta seção
    useEffect(() => {
        if (listaIngrediente && listaIngrediente.length > 0 && items) {
            const idsFromLista = listaIngrediente.filter(id => 
                items.some(ingredient => ingredient.idIngrediente === id)
            );
            setSelectedIngredients(idsFromLista);
        } else {
            setSelectedIngredients([]);
        }
    }, [listaIngrediente, items]);

    const handleToggle = (id) => {
        setSelectedIngredients(prev => {
            const isCurrentlySelected = prev.includes(id);
            let newSelection;
            
            if (isCurrentlySelected) {
                newSelection = prev.filter(ingredientId => ingredientId !== id);
            } else {
                if (maxQuantity === 0 || prev.length < maxQuantity) {
                    newSelection = [...prev, id];
                } else {
                    return prev;
                }
            }
            
            
            // Notifica o componente pai sobre a mudança
            if (onSelectionChange) {
                onSelectionChange(IngredientType, newSelection);
            }
            
            return newSelection;
        });
    };

    const currentCount = selectedIngredients.length;
    const limitReached = currentCount >= maxQuantity && maxQuantity !== 0;
    var aditionalPrice = 0
    if(essentials.length > 0){
        aditionalPrice = essentials.filter(item => item.descricao == 'Adicionais')[0].precoUnitario
    }
    const totalPrice = items
    ? items
        .filter(item => selectedIngredients.includes(item.idIngrediente))
        .reduce((total, item) => {
            // Para adicionais, usa o peso. Para outros tipos, preço fixo
            console.log(item)
            if (item.tipoIngrediente.descricao.toLowerCase() === 'adicionais') {
                return total + ( aditionalPrice * (weight || 1));
            }
        }, 0)
    : 0;

    setProduct(totalPrice)
    // Verifica se esta seção obrigatória está vazia
    const isRequiredAndEmpty = required && selectedIngredients.length === 0;

    // Se não há itens para esta seção, oculta o componente
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <>
            <Container sx={{width: '100%', padding: 0, marginBottom: 1}}>
                <Typography 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: isRequiredAndEmpty ? '#d32f2f' : theme.palette.primary.main 
                    }} 
                >
                    {IngredientType}
                    {maxQuantity > 0 && ` (Máximo: ${maxQuantity})`}
                    {isRequiredAndEmpty && ' *'}
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
                    active={selectedIngredients.includes(item.idIngrediente)}
                    onToggle={handleToggle}
                    disabled={limitReached && !selectedIngredients.includes(item.idIngrediente)}
                />
            ))}
        </>
    );
}