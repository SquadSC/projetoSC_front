import { Container, Typography } from "@mui/material";

export function sectionComponent(IngredientType) {

    return (
        <>
            <Typography>{IngredientType}</Typography>
            <Container>

            </Container>
            <Box sx={lineGolden} />
        </>
    )
}