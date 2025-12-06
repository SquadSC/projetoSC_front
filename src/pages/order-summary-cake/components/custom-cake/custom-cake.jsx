import {
  Box,
  Button,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from '@mui/material';
import { SectionComponent } from '../section/sectionComponent';
import { FormField } from '../../../../components/text-field/text-field.component';
import theme from '../../../../theme';
import { useState, useMemo } from 'react';
import { slimLineGolden } from '../../../../components/header/header-component.style';

export default function CustomCake({
  cakeData,
  essentials,
  canAdvance,
  nextStep,
}) {
  const {
    selectedIngredients,
    organizedIngredients,
    errors,
    cakeType,
    toggleIngredient,
    rules,
  } = cakeData.ingredientSelection;

  const { weight, setWeight, calculateTotalPrice } = cakeData.priceCalculator;

  const [recheioType, setRecheioType] = useState('basico');

  // Verifica se existem recheios disponíveis
  const recheioBasicoAvailable = organizedIngredients.recheioBasico?.length > 0;
  const recheioPremiumAvailable =
    organizedIngredients.recheioPremium?.length > 0;

  // Calcula o preço base atual baseado no tipo de recheio
  const currentBasePrice = useMemo(() => {
    if (!cakeType || !essentials?.length) return 0;

    const baseProduct = essentials.find(item => {
      const descricao = item.descricao?.toLowerCase();
      return descricao === cakeType?.toLowerCase();
    });

    return baseProduct
      ? parseFloat(baseProduct.precoUnitario || 0) * weight
      : 0;
  }, [cakeType, essentials, weight]);

  const handleRecheioTypeChange = event => {
    const newRecheioType = event.target.value;
    setRecheioType(newRecheioType);

    // Limpa todos os recheios selecionados quando muda o tipo
    const currentRecheios = selectedIngredients.recheio || [];
    currentRecheios.forEach(ingredientId => {
      toggleIngredient('recheio', ingredientId);
    });
  };

  const handleWeightChange = newWeight => {
    setWeight(newWeight);
  };

  // Função para lidar com seleção de ingredientes
  const onIngredientToggle = (type, ingredientId) => {
    toggleIngredient(type, ingredientId);
  };

  const totalPrice = calculateTotalPrice(cakeType, selectedIngredients);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: 2,
          pb: 2,
          color: 'primary.main',
        }}
      >
        <Stack spacing={3}>
          <Typography variant='subTitleLittle' fontWeight='semiBold'>
            Personalize seu bolo
          </Typography>

          <FormField
            value={weight}
            onChange={handleWeightChange}
            listOptions={[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]}
          />
        </Stack>

        <Box pt={4}>
          <SectionComponent
            ingredientType='massa'
            title='Qual a massa do seu bolo?'
            items={organizedIngredients.massa}
            selectedIngredients={selectedIngredients.massa || []}
            onIngredientToggle={onIngredientToggle}
            maxQuantity={rules.MASSA.max}
            required={true}
            errors={errors}
          />

          <Box
            my={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={slimLineGolden}></Box>
          </Box>

          {(recheioBasicoAvailable || recheioPremiumAvailable) && (
            <Container sx={{ width: '100%', padding: 0, marginBottom: 3 }}>
              <Typography
                variant='subTitleLittle'
                fontWeight={'semiBold'}
                sx={{ color: theme.palette.primary.main }}
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
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '15px',
                          fontWeight: 'medium',
                        },
                      }}
                    />
                    <FormControlLabel
                      value='premium'
                      control={<Radio size='small' />}
                      label='Premium'
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '15px',
                          fontWeight: 'medium',
                        },
                      }}
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
                required={true}
                errors={errors}
              />
              <Box my={2} sx={slimLineGolden}></Box>
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
                required={true}
                errors={errors}
              />
              <Box my={2} sx={slimLineGolden}></Box>
            </>
          )}

          <SectionComponent
            ingredientType='adicionais'
            title='Adicionais'
            items={organizedIngredients.adicionais}
            selectedIngredients={selectedIngredients.adicionais || []}
            onIngredientToggle={onIngredientToggle}
            maxQuantity={2} // Máximo de 2 adicionais
            required={false}
            weight={weight}
            essentials={essentials}
            errors={errors}
          />
        </Box>

        <Box
          sx={{
            mt: 4,
            mb: 3,
            p: 3,
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}08 100%)`,
            border: `1px solid ${theme.palette.primary.main}30`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Stack spacing={2}>
            {/* Título */}
            <Typography
              variant='subTitleLittle'
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                textAlign: 'center',
                letterSpacing: '0.5px',
              }}
            >
              Resumo do Pedido
            </Typography>

            <Box sx={slimLineGolden}></Box>

            {/* Preço Base */}
            {currentBasePrice > 0 && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography
                  variant='text'
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 'medium',
                    width: '70%',
                  }}
                >
                  Preço base ({cakeType} - {weight}kg)
                </Typography>
                <Typography
                  variant='text'
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  R$ {currentBasePrice.toFixed(2)}
                </Typography>
              </Box>
            )}

            {/* Adicionais */}
            {totalPrice > currentBasePrice && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography
                  variant='text'
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 'medium',
                  }}
                >
                  Adicionais
                </Typography>
                <Typography
                  variant='text'
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  + R$ {(totalPrice - currentBasePrice).toFixed(2)}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main}40 50%, transparent 100%)`,
                my: 1,
              }}
            />

            {/* Preço Total */}
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: theme.palette.primary.main + '10',
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Total
              </Typography>
              <Box display='flex' alignItems='baseline' gap={0.5}>
                <Typography
                  variant='body2'
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'medium',
                  }}
                >
                  R$
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                >
                  {totalPrice?.toFixed(2) || '0.00'}
                </Typography>
              </Box>
            </Box>
          </Stack>
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
