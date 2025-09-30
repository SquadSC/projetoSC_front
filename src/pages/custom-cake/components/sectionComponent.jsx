import { Container, Typography, Box } from "@mui/material";
import { slimLineGolden } from "../../../components/header/header-component.style";
import { useEffect, useState } from "react";
import IngredientComponent from "./IngredientComponent";
import { grey } from "@mui/material/colors";

export function SectionComponent({ IngredientType, items }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(items);
    }, [items]);
    return (
        <>


            {checkIngredientType(IngredientType)}
            <Container>
                <Box>
                    {
                        products && products.map(item =>
                            <IngredientComponent id={item.idIngrediente} item={item} />
                        )
                    }
                </Box>
            </Container>
            <Box sx={slimLineGolden} />
        </>
    );
}

function checkIngredientType(ingredient) {
    console.log(ingredient)
    if (ingredient == 'Massa') {
        return (
            <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Qual a Massa do Bolo?</Typography>
                <Box
                sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    backgroundColor: '#efebeb',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: grey[800],
                    ml: 2, // Espaço à esquerda
                }}
                >
                Obrigatório
                </Box>
            </Box>
            <Typography sx={{ fontWeight: 'bold', color: 'grey', fontSize: '10px' }}>Escolha 1 opção</Typography>
            </>
        )
        
    }
    else if (ingredient == 'Cobertura') {
        return (
            <>
            <Typography sx={{ fontWeight: 'bold' }}>Qual o Recheio do Bolo</Typography>
            <Typography sx={{ fontWeight: 'bold', color: 'grey', fontSize: '10px' }}>Escolha até 2 opções</Typography>
            </>
        );
    }
    else if (ingredient == 'Adicionais') {
        return (
            <>
                <Typography sx={{ fontWeight: 'bold' }}>Deseja colocar adicionais?</Typography>
                <Typography sx={{ fontWeight: 'bold', color: 'grey', fontSize: '10px' }}>+R$5.50 Por Quilo</Typography>
            </>
        );
    }
}
