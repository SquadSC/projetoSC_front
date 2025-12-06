import { Typography, Container } from '@mui/material';
import { useMemo } from 'react';
import IngredientComponent from '../ingredient/IngredientComponent';
import theme from '../../../../theme';

export function SectionComponent({
  ingredientType,
  title,
  items,
  selectedIngredients = [],
  onIngredientToggle,
  maxQuantity = 0,
  weight = 1,
  required = false,
  essentials = [],
  errors = {},
}) {
  const handleToggle = id => {
    const isCurrentlySelected = selectedIngredients.includes(id);

    if (onIngredientToggle) {
      onIngredientToggle(ingredientType, id, !isCurrentlySelected);
    }
  };

  const currentCount = selectedIngredients.length;
  const limitReached = currentCount >= maxQuantity && maxQuantity !== 0;

  // Calcula preço adicional para ingredientes tipo "adicionais"
  const additionalPrice = useMemo(() => {
    if (ingredientType !== 'adicionais' || !essentials.length) return 0;

    const additionalEssential = essentials.find(
      item => item.descricao?.toLowerCase() === 'adicionais',
    );

    return additionalEssential?.precoUnitario || 0;
  }, [ingredientType, essentials]);

  const totalPrice = useMemo(() => {
    if (!items || ingredientType !== 'adicionais') return 0;

    return items
      .filter(item => selectedIngredients.includes(item.idIngrediente))
      .reduce(total => {
        return total + additionalPrice * weight;
      }, 0);
  }, [items, selectedIngredients, additionalPrice, weight, ingredientType]);

  // Verifica se esta seção obrigatória está vazia
  const isRequiredAndEmpty = required && selectedIngredients.length === 0;
  const hasError = errors[ingredientType];

  // Se não há itens para esta seção, oculta o componente
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      <Container sx={{ width: '100%', padding: 0, marginBottom: 1 }}>
        <Typography
          variant='subTitleLittle'
          fontWeight={'semiBold'}
          sx={{
            display: 'flex',
            color:
              isRequiredAndEmpty || hasError
                ? '#d32f2f'
                : theme.palette.primary.main,
          }}
        >
          {title}
          {required && ' *'}
        </Typography>

        {/* Mostra informações combinadas para adicionais com limite */}
        {ingredientType === 'adicionais' && maxQuantity > 0 && (
          <Typography
            variant='caption'
            color={totalPrice > 0 ? 'success.main' : 'text.secondary'}
          >
            {currentCount}/{maxQuantity} selecionados {totalPrice > 0 ? `(+R$ ${totalPrice.toFixed(2)})` : '(+R$ 0.00)'}
          </Typography>
        )}

        {/* Mostra informações de preço para adicionais sem limite (fallback) */}
        {ingredientType === 'adicionais' && maxQuantity === 0 && (
          <Typography
            variant='caption'
            color={totalPrice > 0 ? 'success.main' : 'text.secondary'}
          >
            {totalPrice > 0
              ? `Adicional: +R$ ${totalPrice.toFixed(2)}`
              : 'Nenhum adicional selecionado'}
          </Typography>
        )}

        {/* Mostra contador para seções com limite (exceto adicionais que já mostra acima) */}
        {maxQuantity > 0 && ingredientType !== 'adicionais' && (
          <Typography variant='caption' color='text.secondary'>
            {currentCount}/{maxQuantity} selecionados
          </Typography>
        )}

        {/* Mostra mensagem de erro se existir */}
        {hasError && (
          <Typography variant='caption' color='error.main' display='block'>
            {errors[ingredientType]}
          </Typography>
        )}
      </Container>

      {items &&
        items.map((item, index) => (
          <IngredientComponent
            key={item.idIngrediente}
            ingredient={item}
            isSelected={selectedIngredients.includes(item.idIngrediente)}
            onClick={() => handleToggle(item.idIngrediente)}
            isDisabled={
              limitReached && !selectedIngredients.includes(item.idIngrediente)
            }
            showDivider={index < items.length - 1}
          />
        ))}
    </>
  );
}
