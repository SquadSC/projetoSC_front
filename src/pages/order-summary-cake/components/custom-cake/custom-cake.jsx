import { Box, Button, Container, Typography } from "@mui/material";
import { SectionComponent } from "../section/sectionComponent";
import { FormField } from "../../../../components/text-field/text-field.component";
import theme from "../../../../theme"
import { useEffect, useState } from "react";
import { slimLineGolden } from "../../../../components/header/header-component.style";


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


export default function CustomCake({ ingredients, nextStep, infoCake }) {
    const [sortedIngredients, setSortedIngredients] = useState({});
    const [peso, setPeso] = useState({});
    console.log({ ingredients })
    useEffect(() => {
        setSortedIngredients(sortIngredientsByType(ingredients));
    }, [ingredients]);
    console.log(sortedIngredients)
    return (
        <>
            {/* <StepperComponent /> */}
            <Container sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Personalize seu Bolo</Typography>
                <Typography sx={{ fontWeight: 'bold', color: 'grey', fontSize: '10px' }}>Peso do Bolo(Kg)</Typography>
                <FormField
                    value={peso}
                    onChange={setPeso}
                    listOptions={[1, 1.5, 2, 2.5, 3, 3.5]}
                ></FormField>
                <Box>
                    <SectionComponent IngredientType="Massa" items={sortedIngredients.massa} maxQuantity={1} />
                    <Box sx={slimLineGolden}></Box>
                    <SectionComponent IngredientType="Cobertura" items={sortedIngredients.cobertura} maxQuantity={2} />
                    <Box sx={slimLineGolden}></Box>
                    <SectionComponent IngredientType="Adicionais" items={sortedIngredients.adicionais} weight={peso} />
                </Box>

                <Button
                    variant='contained'
                    fullWidth
                    sx={{ borderRadius: '24px', height: '48px' }}
                    onClick={nextStep}
                >
                    Avançar
                </Button>
            </Container>

        </>
    )
}