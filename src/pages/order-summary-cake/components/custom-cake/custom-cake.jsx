import { Box, Button, Container, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { SectionComponent } from "../section/sectionComponent";
import { FormField } from "../../../../components/text-field/text-field.component";
import theme from "../../../../theme"
import { useEffect, useState } from "react";
import { slimLineGolden } from "../../../../components/header/header-component.style";

function sortIngredientsByType(ingredients) {
    if (!ingredients || ingredients.length === 0) {
        return {};
    }
    const types = {};
    ingredients.forEach(ingredient => {
        const type = ingredient.tipoIngrediente.descricao;
        
        // Separar recheios entre normais e premium
        if (type === 'recheio') {
            const recheioType = ingredient.premium ? 'recheioPremium' : 'recheioBasico';
            if (!types[recheioType]) {
                types[recheioType] = [];
            }
            types[recheioType].push(ingredient);
        } else {
            // Para outros tipos, mantém o comportamento normal
            if (!types[type]) {
                types[type] = [];
            }
            types[type].push(ingredient);
        }
    });
    console.log(types)
    return types;
}

export default function CustomCake({ ingredients, nextStep, infoCake, essentials }) {

  

    const {
        product,
        setProduct
    } = infoCake

    const [sortedIngredients, setSortedIngredients] = useState({});
    const [peso, setPeso] = useState(1);
    const [listaIngredientes, setListaIngredientes] = useState([]);
    const [recheioType, setRecheioType] = useState(''); // 'basico' ou 'premium'

    // Configuração das seções obrigatórias
    const requiredSections = ['massa', 'cobertura']; // Defina quais seções são obrigatórias

    console.log({ ingredients })
    useEffect(() => {
        setSortedIngredients(sortIngredientsByType(ingredients));
    }, [ingredients]);

    // Auto-seleciona tipo de recheio se houver apenas um disponível
    useEffect(() => {
        if (sortedIngredients.recheioBasico && sortedIngredients.recheioPremium) {
            // Se há ambos, deixa o usuário escolher (não auto-seleciona)
            if (!recheioType) {
                setRecheioType('basico'); // Padrão básico
            }
        } else if (sortedIngredients.recheioBasico && !sortedIngredients.recheioPremium) {
            setRecheioType('basico');
        } else if (sortedIngredients.recheioPremium && !sortedIngredients.recheioBasico) {
            setRecheioType('premium');
        }
    }, [sortedIngredients, recheioType]);

    useEffect(() => {
        // Busca os objetos completos dos ingredientes selecionados
        const selectedIngredientsObjects = listaIngredientes.map(id => {
            return ingredients.find(ingredient => ingredient.idIngrediente === id);
        }).filter(Boolean); // Remove valores undefined

        setProduct(prevProduct => ({
            ...prevProduct,
            ingredientList: selectedIngredientsObjects,
            weight: peso
        }));
        
        console.log('Product atualizado:', {
            ingredientList: selectedIngredientsObjects,
            weight: peso
        });
    }, [listaIngredientes, peso, setProduct, ingredients]);

    // Callback para atualizar a lista de ingredientes selecionados
    const handleSelectionChange = (sectionType, selectedIds) => {
        setListaIngredientes(prev => {
            // Remove todos os ingredientes desta seção
            const filteredList = prev.filter(id => {
                const ingredient = ingredients.find(ing => ing.idIngrediente === id);
                if (!ingredient) return false;
                
                // Mapeia os nomes das seções para comparação correta
                const ingredientType = ingredient.tipoIngrediente.descricao.toLowerCase();
                let currentSectionType = sectionType.toLowerCase();
                
                // Para recheios, trata ambos os tipos como 'recheio'
                if (sectionType === 'Recheio Básico' || sectionType === 'Recheio Premium') {
                    currentSectionType = 'recheio';
                }
                
                // Remove ingredientes que pertencem à seção atual
                return ingredientType !== currentSectionType;
            });
            
            // Adiciona os novos selecionados desta seção
            return [...filteredList, ...selectedIds];
        });
    };

    // Limpa seleções de recheio quando muda o tipo
    const handleRecheioTypeChange = (event) => {
        const newType = event.target.value;
        setRecheioType(newType);
        
        // Remove todos os recheios da lista atual
        const filteredList = listaIngredientes.filter(id => {
            const ingredient = ingredients.find(ing => ing.idIngrediente === id);
            return !ingredient || ingredient.tipoIngrediente.descricao.toLowerCase() !== 'recheio';
        });
        setListaIngredientes(filteredList);
    };

    // Função para verificar se todas as seções obrigatórias foram preenchidas
    const checkRequiredSections = () => {
        return requiredSections.every(sectionType => {
            // Verifica se há pelo menos um ingrediente selecionado desta seção
            return listaIngredientes.some(id => {
                const ingredient = ingredients.find(ing => ing.idIngrediente === id);
                return ingredient && ingredient.tipoIngrediente.descricao.toLowerCase() === sectionType.toLowerCase();
            });
        });
    };

    // Função para obter seções faltantes
    const getMissingSections = () => {
        return requiredSections.filter(sectionType => {
            return !listaIngredientes.some(id => {
                const ingredient = ingredients.find(ing => ing.idIngrediente === id);
                return ingredient && ingredient.tipoIngrediente.descricao.toLowerCase() === sectionType.toLowerCase();
            });
        });
    };

    const canAdvance = checkRequiredSections();
    const missingSections = getMissingSections();

    // Verifica se existem recheios de cada tipo
    const hasBasicoRecheio = sortedIngredients.recheioBasico?.length > 0;
    const hasPremiumRecheio = sortedIngredients.recheioPremium?.length > 0;

    console.log('Lista de ingredientes selecionados:', listaIngredientes);

    return (
        <>
            <Container sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    Personalize seu Bolo
                </Typography>
                <Typography sx={{ fontWeight: 'bold', color: 'grey', fontSize: '10px' }}>
                    Peso do Bolo(Kg)
                </Typography>
                <FormField
                    value={peso}
                    onChange={setPeso}
                    listOptions={[1, 1.5, 2, 2.5, 3, 3.5]}
                />
                <Box>
                    <SectionComponent 
                        IngredientType="Massa" 
                        items={sortedIngredients.massa} 
                        maxQuantity={1} 
                        listaIngrediente={listaIngredientes}
                        onSelectionChange={handleSelectionChange}
                        required={true}
                        essentials={essentials}
                        setProduct={setProduct}
                    />
                    <Box sx={slimLineGolden}></Box>
                    
                    <SectionComponent 
                        IngredientType="Cobertura" 
                        items={sortedIngredients.cobertura} 
                        maxQuantity={2}
                        listaIngrediente={listaIngredientes}
                        onSelectionChange={handleSelectionChange}
                        required={true}
                        essentials={essentials}
                        setProduct={setProduct}
                    />
                    <Box sx={slimLineGolden}></Box>

                    {/* Seletor de tipo de recheio */}
                    {(hasBasicoRecheio || hasPremiumRecheio) && (
                        <Container sx={{width: '100%', padding: 0, marginBottom: 1}}>
                            <Typography sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                Tipo de Recheio
                            </Typography>
                            {/* Só mostra RadioGroup se há ambos os tipos */}
                            {hasBasicoRecheio && hasPremiumRecheio ? (
                                <Box sx={{ mt: 1, mb: 2 }}>
                                    <RadioGroup
                                        row
                                        value={recheioType}
                                        onChange={handleRecheioTypeChange}
                                    >
                                        <FormControlLabel 
                                            value="basico" 
                                            control={<Radio size="small" />} 
                                            label="Básico" 
                                        />
                                        <FormControlLabel 
                                            value="premium" 
                                            control={<Radio size="small" />} 
                                            label="Premium" 
                                        />
                                    </RadioGroup>
                                </Box>
                            ) : (
                                <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                                    {hasBasicoRecheio ? 'Básico' : 'Premium'}
                                </Typography>
                            )}
                        </Container>
                    )}

                    {/* Seção de Recheio Básico */}
                    {recheioType === 'basico' && hasBasicoRecheio && (
                        <>
                            <SectionComponent 
                                IngredientType="Recheio Básico" 
                                items={sortedIngredients.recheioBasico} 
                                maxQuantity={2}
                                listaIngrediente={listaIngredientes}
                                onSelectionChange={handleSelectionChange}
                                required={false}
                                essentials={essentials}
                                infoCake={setProduct}
                            />
                            <Box sx={slimLineGolden}></Box>
                        </>
                    )}

                    {/* Seção de Recheio Premium */}
                    {recheioType === 'premium' && hasPremiumRecheio && (
                        <>
                            <SectionComponent 
                                IngredientType="Recheio Premium" 
                                items={sortedIngredients.recheioPremium} 
                                maxQuantity={2}
                                listaIngrediente={listaIngredientes}
                                onSelectionChange={handleSelectionChange}
                                required={false}
                                essentials={essentials}
                                infoCake={setProduct} 
                            />
                            <Box sx={slimLineGolden}></Box>
                        </>
                    )}
                    
                    <SectionComponent 
                        IngredientType="Adicionais" 
                        items={sortedIngredients.adicionais} 
                        weight={peso} 
                        listaIngrediente={listaIngredientes}
                        onSelectionChange={handleSelectionChange}
                        required={false}
                        essentials={essentials}
                        infoCake={setProduct}
                    />
                </Box>

                
                <Button
                    variant='contained'
                    fullWidth
                    sx={{ 
                        borderRadius: '24px', 
                        height: '48px', 
                        mt: 2,
                        opacity: canAdvance ? 1 : 0.6
                    }}
                    onClick={nextStep}
                    disabled={!canAdvance}
                >
                    Avançar
                </Button>
            </Container>
        </>
    )
}