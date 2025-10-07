import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export function MetricCard({ title, value, trend, isPositive }) {
  return (
    <Card
      sx={{
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '100%',
        border: '1px solid #38090D', // Borda marrom da marca
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        width: '100%', // Ocupa toda a largura do container pai
      }}
    >
      {/* Conteúdo interno do card com padding */}
      <CardContent sx={{ p: 2 }}>
        {/* LINHA 1: Título e ícone indicador de tendência */}
        <Box
          sx={{
            display: 'flex', // Layout flexível
            justifyContent: 'space-between', // Espaço entre os elementos
            alignItems: 'flex-start', // Alinhamento no topo para permitir quebra de linha
            mb: 1.5,
          }}
        >
          {/* Título da métrica com cor marrom da marca e fonte do theme */}
          <Typography
            variant='text'
            sx={{
              color: '#38090D', // Cor marrom da marca
              fontSize: 'textLittle', // textLittle do theme
              fontWeight: 'semiBold', // semiBold
              width: '60%', // Ocupa espaço disponível
              mr: 1, // Margem direita
            }}
          >
            {title}
          </Typography>

          {/* Ícone de tendência*/}
          {isPositive ? (
            <TrendingUp sx={{ color: 'green', fontSize: 40 }} />
          ) : (
            <TrendingDown sx={{ color: 'red', fontSize: 40 }} />
          )}
        </Box>

        {/* LINHA 2: Valor numérico e percentual de tendência */}
        <Box
          sx={{
            display: 'flex', // Layout flexível
            justifyContent: 'space-between', // Espaço entre os elementos
            alignItems: 'center', // Alinhamento vertical central
          }}
        >
          {/* Valor principal da métrica com cor cinza escura */}
          <Typography
            variant='h4' // Tamanho grande de fonte
            sx={{
              fontWeight: 'bold', // Texto em negrito
              color: '#2C2C2C', // Cor cinza escura quase preto
            }}
          >
            {value}
          </Typography>

          {/* Percentual de tendência */}
          <Typography
            sx={{
              color: isPositive ? 'green' : 'red', // Verde se positivo, vermelho se negativo
              fontWeight: 'bold', // Peso da fonte médio
              fontSize: 'text', // Tamanho maior para a taxa
            }}
          >
            {trend}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
