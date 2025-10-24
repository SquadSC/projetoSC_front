import * as React from 'react';
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import { useState } from 'react';
import { formatCurrencyBRL } from '../../../../utils/formatter/currency-formatter/currency-formatter';
import { useUser } from '../../../../hooks/use-user/useUser';

export function OrderSummary({ cakeData, ingredients, essentials, onSubmit }) {
  const { getUserId } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { selectedIngredients, cakeType, getAllSelectedIds } =
    cakeData.ingredientSelection;

  const { weight, calculateTotalPrice, getProductId } =
    cakeData.priceCalculator;

  const { theme, selectedImage, getSubmissionData } = cakeData.themeAndImage;

  const { observation } = cakeData.observation;

  const { buildOrderObject, validateOrder } = cakeData.orderBuilder;

  // Calcula valores
  const totalPrice = calculateTotalPrice(
    cakeType,
    selectedIngredients,
    ingredients,
  );
  const productId = getProductId(cakeType);
  const selectedIngredientIds = getAllSelectedIds();
  const themeImageData = getSubmissionData();
  const userId = getUserId();

  // Constrói objeto do pedido
  const orderObject = buildOrderObject({
    userId,
    selectedIngredientIds,
    productId,
    quantity: 1,
    totalPrice,
    theme: themeImageData.theme,
    observation,
    attachmentId: themeImageData.attachmentId,
  });

  // Valida pedido
  const orderValidation = validateOrder(orderObject);

  const capitalizeFirst = text => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const getImageSrc = () => {
    if (!selectedImage) return null;

    if (selectedImage.source === 'upload') {
      return selectedImage.data;
    } else if (selectedImage.source === 'carousel') {
      return selectedImage.data.imagem_anexo;
    }

    return null;
  };

  const getSelectedIngredients = () => {
    const allIds = getAllSelectedIds();
    return allIds
      .map(id =>
        ingredients.find(ingredient => ingredient.idIngrediente === id),
      )
      .filter(Boolean);
  };

  const handleSubmit = async () => {
    if (!orderValidation.isValid) {
      setSubmitError('Dados do pedido inválidos. Verifique as informações.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {

      // Aqui você faria a chamada para o backend
      await onSubmit(orderObject);
    } catch (error) {
      setSubmitError('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageSrc = getImageSrc();
  const selectedIngredientsList = getSelectedIngredients();
  const valorTotal = Number(totalPrice) || 0;
  const valorTotalFormatado = formatCurrencyBRL(valorTotal);
  const valor50 = formatCurrencyBRL(valorTotal / 2);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 4,
        pb: 4,
        color: 'primary.main',
      }}
    >
      <Typography variant='h6' fontWeight={600}>
        Resumo do pedido
      </Typography>
      <Box sx={{ mt: 2, mb: 3 }}>
        {imageSrc ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={imageSrc}
              alt='Bolo personalizado'
              style={{
                width: '100%',
                maxWidth: 320,
                height: 220,
                objectFit: 'cover',
                margin: '0 auto',
                borderRadius: 16,
                padding: 8,
              }}
              onError={e => {
                e.target.style.display = 'none';
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
              borderRadius: 2,
              margin: '0 8px',
            }}
          >
            <Typography color='text.secondary'>
              Nenhuma imagem anexada
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' fontWeight={600} sx={{ mb: 1 }}>
          Valor do Pedido
        </Typography>
        <Stack direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
          <Typography variant='text' fontWeight={600}>
            Valor total:
          </Typography>
          <Typography variant='text' fontWeight={600} color='grey'>
            {valorTotalFormatado}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
          <Typography variant='text' fontWeight={600}>
            50% do valor:
          </Typography>
          <Typography variant='text' fontWeight={600} color='grey'>
            {valor50}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' fontWeight={600} sx={{ mb: 1 }}>
          Detalhes
        </Typography>
        <Typography variant='subtitle1' fontWeight={600}>
          Bolo:
        </Typography>
        <ul style={{ marginTop: 1, marginBottom: 8, color: 'grey', gap: 4 }}>
          {selectedIngredientsList?.map((ingred, idx) => (
            <li key={idx}>
              {capitalizeFirst(ingred.tipoIngrediente?.descricao)
                ? `${capitalizeFirst(ingred.tipoIngrediente?.descricao)}: `
                : ''}
              {ingred.nome}
              {ingred.premium ? ' (premium)' : ''}
            </li>
          ))}
        </ul>
        <Typography variant='subtitle1' fontWeight={600} sx={{ mt: 1 }}>
          Detalhes adicionais do pedido:
        </Typography>
        <Typography variant='textLittle' sx={{ mt: 1, color: 'grey' }}>
          {observation || 'Nenhuma observação adicional.'}
        </Typography>
      </Box>

      {/* Debug info em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant='subtitle2' sx={{ mb: 1 }}>
            Objeto a ser enviado (DEV):
          </Typography>
          <pre
            style={{
              fontSize: '0.8rem',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {JSON.stringify(orderObject, null, 2)}
          </pre>
        </Box>
      )}

      <Button
        variant='contained'
        color='primary'
        fullWidth
        sx={{ borderRadius: '24px', height: '48px', mt: 2 }}
        onClick={handleSubmit}
        disabled={!orderValidation.isValid || isSubmitting}
      >
        {isSubmitting ? 'Finalizando Pedido...' : 'Finalizar Pedido'}
      </Button>
    </Container>
  );
}
