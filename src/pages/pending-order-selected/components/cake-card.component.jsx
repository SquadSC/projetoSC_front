import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import {
  cakeCard,
  cakeCardHeader,
  cakeCardTag,
  cakeCardContent,
  cakeCardRow,
} from '../styles/pending-order-selected.style.js';

export function CakeCard({ item, onViewDetails }) {
  // Determina se é Premium (tem ingredientes premium)
  const isPremium = item.ingredientes?.some(ing => ing.isPremium) || false;
  
  // Tema do bolo
  const tema = item.informacaoBolo?.tema || 'Sem tema definido';
  
  // Peso (quantidade)
  const peso = item.quantidade ? `${item.quantidade.toFixed(1)} Kg` : 'N/A';
  
  // Valor total do item
  const valorTotal = item.precoItem || item.precoUnitario || 0;
  
  // 50% do valor
  const valorParcial = (valorTotal * 0.5).toFixed(2);

  return (
    <Card sx={cakeCard}>
      <CardContent>
        {/* Header - ID do bolo e tag Premium/Básico */}
        <Box sx={cakeCardHeader}>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            Bolo #{item.idItemPedido}
          </Typography>
          <Chip
            label={isPremium ? 'Premium' : 'Básico'}
            sx={cakeCardTag(isPremium)}
            size="small"
          />
        </Box>

        {/* Conteúdo do card */}
        <Box sx={cakeCardContent}>
          {/* Linha: Tema do bolo e Peso */}
          <Box sx={cakeCardRow}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Tema do bolo:
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {tema}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                Peso:
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {peso}
              </Typography>
            </Box>
          </Box>

          {/* Linha: Valor total e 50% do valor */}
          <Box sx={cakeCardRow}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Valor total:
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                R$ {valorTotal.toFixed(2).replace('.', ',')}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                50% do valor:
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                R$ {valorParcial.replace('.', ',')}
              </Typography>
            </Box>
          </Box>

          {/* Botão Ver Detalhes */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onViewDetails(item)}
            fullWidth
            sx={{ mt: 1}}
          >
            Ver Detalhes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

