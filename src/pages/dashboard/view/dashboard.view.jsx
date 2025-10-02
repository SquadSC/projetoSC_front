import { Box, Container, Typography } from '@mui/material';
import { PageHeader } from '../../../components/header-jornada/header-jornada.component';

export function DashboardView({
    
}) {


    return (
        <>
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', p: 3, }}>
      {/* Header */}
        <PageHeader
          titulo='Dashboard'
          showBackButton={true}
          width='100%'
        ></PageHeader>

      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Typography variant="h6" color="primary" fontWeight="fontWeightSemiBold" sx={{ mb: 2 }}>
          Dashboard
        </Typography>
       </Container>
       </Box>
        </>
    );
}
