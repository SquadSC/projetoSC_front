import { request } from '../../../services/api';
import { useState, useEffect } from 'react';
import CustomCakeView from '../view/custrom-cake.view';

export function CustomCakeController() {
    const [ingredients, setIngredients] = useState([]);

useEffect(() => {
    try {
        request.get('/ingredientes?ativos=true')
        .then(response => {
            console.log('response.data:', response.data); // <-- Veja se aparece aqui
            setIngredients(response.data);
        });
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
}, []);

    return <CustomCakeView ingredients={ingredients} />;
}