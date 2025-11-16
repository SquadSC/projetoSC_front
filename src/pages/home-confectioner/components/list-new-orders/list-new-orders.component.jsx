import { Box, Stack, Typography } from '@mui/material';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';

export function ListNewOrdersComponent() {
  const ordersData = 
  [
    {
      id_pedido: 14255,
      data_pedido: '2025-09-16',
      hora_pedido: '23:54:00',
      status: 'premium',
      itens: [
        {
          id_item: 1,
          tipo: 'premium',
          tema: 'Genérico',
          peso: '1kg',
          preco: 100.0,
        },
        {
          id_item: 2,
          tipo: 'basico',
          tema: 'Ben 10',
          peso: '1kg',
          preco: 80.0,
        },
      ],
    },
    {
        id_pedido: 14256,
        data_pedido: '2025-09-17',
        hora_pedido: '10:30:00',
        status: 'basico',
        itens: [
          {
            id_item: 3,
            tipo: 'basico',
            tema: 'Minnie',
            peso: '2kg',
            preco: 120.0,
          }
        ],
    }
  ];
  return (
    <>
      <Stack spacing={2}>
        <FilterChipsComponent />
        <Stack spacing={1}>
            {}
        </Stack>
      </Stack>
    </>
  );
}
