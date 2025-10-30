import React from 'react';
import logo from '../../assets/logo-ele-doces.svg';

export function LogoComponent() {

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div
      onClick={handleLogoClick}
      style={{
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <img src={logo} alt='Logo Ele Doces' style={{ height: 46 }} />
    </div>
  );
}
