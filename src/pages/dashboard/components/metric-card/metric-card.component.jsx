import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import theme from '../../../../theme';

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  color = theme.palette.primary.main,
  trend,
  compact = false,
}) {
  return (
    <Card
      sx={{
        height: compact ? '75px' : '75%',
        background: `linear-gradient(135deg, ${color}08 0%, ${color}04 100%)`,
        border: `1px solid ${color}20`,
        borderLeft: `4px solid ${color}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 25px ${color}15`,
        },
      }}
    >
      <CardContent sx={{ p: compact ? 1 : 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={compact ? 0.3 : 2}
        >
          <Typography
            variant={compact ? "caption" : "body2"}
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 'medium',
              fontSize: compact ? '0.6rem' : '0.875rem',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: compact ? '0.9rem' : '1.5rem' }}
          >
            {icon}
          </Typography>
        </Box>

        <Typography
          variant={compact ? "h6" : "h4"}
          sx={{
            fontWeight: 'bold',
            color: color,
            fontSize: compact ? '1rem' : { xs: '1.5rem', sm: '1.75rem' },
            lineHeight: 1.1,
            mb: subtitle ? 0.3 : (compact ? 1 : 2),
          }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              display: 'block',
              mb: compact ? 0.3 : 1,
              fontSize: compact ? '0.55rem' : '0.75rem',
            }}
          >
            {subtitle}
          </Typography>
        )}

        {trend && (
          <Chip
            size="small"
            label={`${trend.isPositive ? '+' : '-'}${trend.value}%`}
            icon={trend.isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            sx={{
              fontSize: compact ? '0.65rem' : '0.75rem',
              fontWeight: 'bold',
              height: compact ? '20px' : '24px',
              backgroundColor: trend.isPositive
                ? theme.palette.success.main + '15'
                : theme.palette.error.main + '15',
              color: trend.isPositive
                ? theme.palette.success.main
                : theme.palette.error.main,
              '& .MuiChip-icon': {
                fontSize: compact ? '0.75rem' : '0.875rem',
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
