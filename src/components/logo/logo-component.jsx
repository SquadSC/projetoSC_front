import { Link } from 'react-router-dom';
import logo from '../../assets/logo-ele-doces.svg';

export function LogoComponent() {
  return (
    <Link to='/' style={{ textDecoration: 'none' }}>
      <img src={logo} alt='Logo Ele Doces' style={{ height: 46 }} />
    </Link>
  );
}
