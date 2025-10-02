import { StepperComponent } from "../../../components/stepper/stepper-component";
import { Box, Container, Typography } from "@mui/material";
import { SectionComponent } from "../components/sectionComponent";
import { useEffect, useState } from "react";

function sortIngredientsByType(ingredients) {
    if (!ingredients || ingredients.length === 0) {
        return {};
    }
    if (ingredients.length === 0) {
        return {};
    }
    const types = {};
    ingredients.forEach(ingredient => {
        const type = ingredient.tipoIngrediente.descricao;
        if (!types[type]) {
            types[type] = [];
        }
        types[type].push(ingredient);
    });
    console.log(types)
    return types;
}


export default function CustomCakeView({ ingredients }) {
    const [sortedIngredients, setSortedIngredients] = useState({});
    console.log({ingredients})
    useEffect(() => {
        setSortedIngredients(sortIngredientsByType(ingredients));
    }, [ingredients]);
    console.log( sortedIngredients)
    return (
        <>
            {/* <StepperComponent /> */}
            <Container sx={{ p: 3 }}>
                <Typography sx={{fontWeight: 'bold'}}>Personalize seu Bolo</Typography>
                <Box>
                <SectionComponent IngredientType="Massa" items={sortedIngredients.massa} />
                <SectionComponent IngredientType="Cobertura" items={sortedIngredients.cobertura} />
                <SectionComponent IngredientType="Adicionais" items={sortedIngredients.adicionais} />
                </Box>
            </Container>

        </>
    )
}