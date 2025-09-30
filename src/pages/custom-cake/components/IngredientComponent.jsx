import { Typography, Box, IconButton, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState, useEffect } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function IngredientComponent({ id , item }) {
    const [active, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!active);
    };
    
    return (
        <Box display="flex" alignItems="center" mb={2} sx={{ opacity: active ? 1 : 0.5 }}>
            {console.log(item)}
            <Typography sx={{ flex: 1 }}>{item.nome}</Typography>
            <IconButton onClick={handleToggle}>
                {active ? <CheckCircleIcon /> : <CancelIcon />}
            </IconButton>
        </Box>
    );
}