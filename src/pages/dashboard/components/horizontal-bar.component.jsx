// Importa componentes do Material-UI necessários
import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

export function HorizontalBar({
  name, // Nome do produto (ex: "Morango", "Ameixas")
  quantity, // Quantidade vendida (ex: 50, 46)
  trend, // Tendência em percentual (ex: "+12%", "-1%")
  isPositive, // Se a tendência é positiva (true) ou negativa (false)
  maxQuantity = 50, // Quantidade máxima para calcular a porcentagem da barra
}) {
  // Calcula a porcentagem para preencher a barra de progresso
  const percentage = (quantity / maxQuantity) * 100;

  return (
    // Container principal do item com margem inferior
    <Box sx={{ mb: 2 }}>
      {/* LINHA SUPERIOR: Nome do produto e informações numéricas */}
      <Box
        sx={{
          display: 'flex', // Layout flexível
          justifyContent: 'space-between', // Espaço entre os elementos
          mb: 0.5, // Margem inferior pequena
        }}
      >
        {/* Nome do produto */}
        <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
          {name}
        </Typography>

        {/* Container com quantidade e tendência */}
        <Box
          sx={{
            display: 'flex', // Layout flexível
            alignItems: 'center', // Alinhamento vertical central
            gap: 0.5, // Espaço entre os elementos
          }}
        >
          {/* Quantidade vendida */}
          <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
            {quantity}
          </Typography>

          {/* Container com ícone e percentual de tendência */}
          <Box
            sx={{
              display: 'flex', // Layout flexível
              alignItems: 'center', // Alinhamento vertical central
              gap: 0.5, // Espaço entre os elementos
            }}
          >
            {/* Ícone de tendência - seta para cima ou para baixo */}
            {isPositive ? (
              <TrendingUp sx={{ color: 'green', fontSize: 14 }} /> // Seta para cima se positivo
            ) : (
              <TrendingDown sx={{ color: 'red', fontSize: 14 }} /> // Seta para baixo se negativo
            )}

            {/* Percentual de tendência */}
            <Typography
              variant='caption' // Tamanho pequeno de fonte
              sx={{
                color: isPositive ? 'green' : 'red', // Verde se positivo, vermelho se negativo
                fontWeight: 'medium', // Peso da fonte médio
              }}
            >
              {trend}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* BARRA DE PROGRESSO HORIZONTAL */}
      {/* Container da barra de fundo */}
      <Box
        sx={{
          width: '100%', // Largura total
          height: 8, // Altura da barra
          backgroundColor: '#F5F5F5', // Cor de fundo cinza claro
          borderRadius: 4, // Bordas arredondadas
          overflow: 'hidden', // Esconde conteúdo que ultrapassa
        }}
      >
        {/* Barra de preenchimento com animação */}
        <Box
          sx={{
            width: `${percentage}%`, // Largura baseada na porcentagem calculada
            height: '100%', // Altura total do container pai
            background:
              'linear-gradient(90deg, #CDA243 0%, #F3E4AA 50.48%, #C59736 100%)', // Gradiente dourado da marca
            borderRadius: 4, // Bordas arredondadas
            transition: 'width 0.3s ease', // Animação suave de 0.3s
          }}
        />
      </Box>
    </Box>
  );
}
