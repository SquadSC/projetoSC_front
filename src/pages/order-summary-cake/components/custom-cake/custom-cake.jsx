import {
  Box,
  Button,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { SectionComponent } from '../section/sectionComponent';
import { FormField } from '../../../../components/text-field/text-field.component';
import theme from '../../../../theme';
import { useState } from 'react';
import { slimLineGolden } from '../../../../components/header/header-component.style';

export default function CustomCake({
  cakeData,
  essentials,
  canAdvance,
  nextStep,
}) {
  const {
    product,
    selectedIngredients,
    handleIngredientSelection,
    organizedIngredients,
    errors,
    weight,
    setWeight,
    rules,
  } = cakeData;

  const [recheioType, setRecheioType] = useState('basico');

  // Verifica se existem recheios disponíveis
  const recheioBasicoAvailable = organizedIngredients.recheioBasico?.length > 0;
  const recheioPremiumAvailable =
    organizedIngredients.recheioPremium?.length > 0;

  const handleRecheioTypeChange = event => {
    setRecheioType(event.target.value);
  };

  const handleWeightChange = newWeight => {
    setWeight(newWeight);
  };

  // Função para lidar com seleção de ingredientes
  const onIngredientToggle = (type, ingredientId, isSelected) => {
    handleIngredientSelection(type, ingredientId, isSelected);
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 4,
          pb: 4,
          color: 'primary.main',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            color: theme.palette.primary.main,
          }}
        >
          Peso do Bolo (Kg)
        </Typography>

        <FormField
          value={weight}
          onChange={handleWeightChange}
          listOptions={[1, 1.5, 2, 2.5, 3, 3.5]}
        />

        <Box>
          <SectionComponent
            ingredientType='massa'
            title='Massa'
            items={organizedIngredients.massa}
            selectedIngredients={selectedIngredients.massa || []}
            onIngredientToggle={onIngredientToggle}
            maxQuantity={rules.MASSA.max}
            required={true}
            errors={errors}
          />
          <Box sx={slimLineGolden}></Box>

          {(recheioBasicoAvailable || recheioPremiumAvailable) && (
            <Container sx={{ width: '100%', padding: 0, marginBottom: 1 }}>
              <Typography
                sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
              >
                Tipo de Recheio
              </Typography>

              {recheioBasicoAvailable && recheioPremiumAvailable ? (
                <Box sx={{ mt: 1, mb: 2 }}>
                  <RadioGroup
                    row
                    value={recheioType}
                    onChange={handleRecheioTypeChange}
                  >
                    <FormControlLabel
                      value='basico'
                      control={<Radio size='small' />}
                      label='Básico'
                    />
                    <FormControlLabel
                      value='premium'
                      control={<Radio size='small' />}
                      label='Premium'
                    />
                  </RadioGroup>
                </Box>
              ) : (
                <Typography variant='caption' sx={{ display: 'block', mb: 2 }}>
                  {recheioBasicoAvailable ? 'Básico' : 'Premium'}
                </Typography>
              )}
            </Container>
          )}

          {recheioType === 'basico' && recheioBasicoAvailable && (
            <>
              <SectionComponent
                ingredientType='recheio'
                title='Recheio Básico'
                items={organizedIngredients.recheioBasico}
                selectedIngredients={selectedIngredients.recheio || []}
                onIngredientToggle={onIngredientToggle}
                maxQuantity={rules.RECHEIO.max}
                required={false}
                errors={errors}
              />
              <Box sx={slimLineGolden}></Box>
            </>
          )}

          {recheioType === 'premium' && recheioPremiumAvailable && (
            <>
              <SectionComponent
                ingredientType='recheio'
                title='Recheio Premium'
                items={organizedIngredients.recheioPremium}
                selectedIngredients={selectedIngredients.recheio || []}
                onIngredientToggle={onIngredientToggle}
                maxQuantity={rules.RECHEIO.max}
                required={false}
                errors={errors}
              />
              <Box sx={slimLineGolden}></Box>
            </>
          )}

          <SectionComponent
            ingredientType='adicionais'
            title='Adicionais'
            items={organizedIngredients.adicionais}
            selectedIngredients={selectedIngredients.adicionais || []}
            onIngredientToggle={onIngredientToggle}
            maxQuantity={0} // Ilimitado
            required={false}
            weight={weight}
            essentials={essentials}
            errors={errors}
          />
        </Box>

        <Button
          variant='contained'
          fullWidth
          sx={{
            borderRadius: '24px',
            height: '48px',
            mt: 2,
            opacity: canAdvance ? 1 : 0.6,
          }}
          onClick={nextStep}
          disabled={!canAdvance}
        >
          Avançar
        </Button>
      </Container>
    </>
  );
}
