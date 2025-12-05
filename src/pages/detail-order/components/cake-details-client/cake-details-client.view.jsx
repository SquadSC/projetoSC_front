import {
  Box,
  Container,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { PageHeader } from '../../../../components/header-jornada/header-jornada.component';
import { formatCurrencyBRL } from '../../../../utils/formatter/currency-formatter/currency-formatter';

/**
 * View da tela de detalhes de um bolo específico do pedido para cliente
 * Exibe imagem, valores e detalhes do bolo (tema, ingredientes, observações)
 * Reutiliza a mesma estrutura do CakeDetailsView da confeiteira
 */
export function CakeDetailsClientView({
  loading,
  item,
  imageSrc,
  itemId,
  error,
}) {
  // Tela de carregamento
  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='80vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!item || error) {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        <Box sx={{ p: 3, pb: 0 }}>
          <PageHeader
            titulo={`Bolo #${itemId || item?.idItemPedido || 'N/A'}`}
            showBackButton={true}
          />
        </Box>
        <Container sx={{ p: 3 }}>
          <Typography variant='body1' color='error'>
            {error || 'Bolo não encontrado.'}
          </Typography>
        </Container>
      </Box>
    );
  }

  // Função para capitalizar primeira letra
  const capitalizeFirst = text => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // Calcula valores
  const valorTotal = item.precoItem || item.precoUnitario || 0;
  const valorTotalFormatado = formatCurrencyBRL(valorTotal);
  const valor50 = formatCurrencyBRL(valorTotal / 2);

  // Tema do bolo
  const tema = item.informacaoBolo?.tema || 'Nenhum tema especificado.';
  const detalhes = item.informacaoBolo?.detalhes || null;

  // Ingredientes do bolo
  const ingredientes = item.ingredientes || [];

  // Agrupa ingredientes por tipo (descricao é o tipo do ingrediente)
  const ingredientesPorTipo = ingredientes.reduce((acc, ing) => {
    const tipo = ing.descricao || 'Outros';
    if (!acc[tipo]) {
      acc[tipo] = [];
    }
    acc[tipo].push(ing);
    return acc;
  }, {});

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header - Título do bolo e botão voltar */}
      <Box sx={{ p: 3, pb: 0 }}>
        <PageHeader
          titulo={`Bolo #${itemId || item?.idItemPedido || 'N/A'}`}
          showBackButton={true}
        />
      </Box>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pb: 4,
          color: 'primary.main',
        }}
      >
        {/* Seção: Imagem do bolo */}
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
                  height: 300,
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
              <Typography variant='text' color='text.secondary'>
                Nenhuma imagem anexada
              </Typography>
            </Box>
          )}
        </Box>

        {/* Seção: Valor do bolo */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='h6' fontWeight={600}>
            Valor do Bolo
          </Typography>
          <Stack
            direction='row'
            justifyContent='space-between'
            sx={{ mb: 1, mt: 3 }}
          >
            <Typography variant='text' fontWeight={600}>
              Valor total do item:
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

        {/* Seção: Detalhes */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='h6' fontWeight={600} sx={{ mb: 1 }}>
            Detalhes
          </Typography>

          {/* Tema */}
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant='subtitle1' fontWeight={600} sx={{ mt: 1 }}>
              Tema:
            </Typography>
            <Typography variant='text' sx={{ mt: 1, color: 'grey' }}>
              {tema}
            </Typography>
          </Stack>

          {/* Bolo - Ingredientes */}
          <Stack sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Typography variant='subtitle1' fontWeight={600}>
              Bolo:
            </Typography>
            {ingredientes.length > 0 ? (
              <ul
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 1,
                  marginBottom: 8,
                  color: 'grey',
                  gap: 6,
                }}
              >
                {Object.entries(ingredientesPorTipo).map(([tipo, ings]) => (
                  <li key={tipo} style={{ marginBottom: 2, fontSize: '14px' }}>
                    <label style={{ fontWeight: 600 }}>
                      {capitalizeFirst(tipo)}:{' '}
                    </label>
                    {ings.map((ing, idx) => (
                      <span key={idx}>
                        {ing.nome}
                        {ing.isPremium ? ' (premium)' : ''}
                        {idx < ings.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant='text' sx={{ mt: 1, color: 'grey' }}>
                Nenhum ingrediente especificado.
              </Typography>
            )}
          </Stack>

          {/* Peso */}
          {item.quantidade && (
            <Stack spacing={1} sx={{ mb: 2 }}>
              <Typography variant='subtitle1' fontWeight={600}>
                Peso:
              </Typography>
              <Typography variant='text' sx={{ mt: 1, color: 'grey' }}>
                {item.quantidade.toFixed(1)} Kg
              </Typography>
            </Stack>
          )}

          {/* Detalhes adicionais do pedido */}
          <Stack spacing={1}>
            <Typography
              variant='subTitleLittle'
              fontWeight={600}
              sx={{ mt: 1 }}
            >
              Detalhes adicionais do pedido:
            </Typography>
            <Typography variant='text' sx={{ mt: 1, color: 'grey' }}>
              {detalhes || 'Nenhuma observação adicional.'}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
