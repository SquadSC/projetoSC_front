import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../utils/enums/routes-url';
export function HomeView() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home View</h1>
      <Button variant='contained' color='primary' onClick={() => navigate(ROUTES_PATHS.REGISTER_USER)}>
        Ação Principal
      </Button>
    </>
  );
}
