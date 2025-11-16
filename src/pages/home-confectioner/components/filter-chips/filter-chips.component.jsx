import { Chip, Stack } from '@mui/material';
import { useState } from 'react';

export function FilterChipsComponent() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Básicos', 'Premium'];

  const handleFilterClick = filter => {
    setActiveFilter(filter);
  };

  return (
    <Stack direction='row' spacing={0} flexWrap={'wrap'} sx={{ gap: 1 }}>
      {filters.map(filter => (
        <Chip
          key={filter}
          color='primary'
          label={filter}
          variant={activeFilter === filter ? 'filled' : 'outlined'}
          onClick={() => handleFilterClick(filter)}
          sx={{
            cursor: 'pointer',
            backgroundColor:
              activeFilter === filter ? 'primary.main' : 'transparent',
            color: activeFilter === filter ? 'white' : 'primary.main',
            '&:hover': {
              backgroundColor:
                activeFilter === filter ? 'primary.dark' : 'primary.light',
            },
          }}
        />
      ))}
    </Stack>
  );
}
