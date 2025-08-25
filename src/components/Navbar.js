import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { colors } from '../theme';
import logo from '../assets/logo.png';

const NavbarContainer = styled(AppBar)({
  background: 'rgba(0, 0, 0, 0.8)', // Fondo semitransparente para visibilidad
  color: colors.textPrimary,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  flexGrow: 1,
});

const Logo = styled('img')({
  height: '40px',
  marginRight: '10px',
});

const NavLink = styled(Link)({
  color: colors.textPrimary,
  textDecoration: 'none',
  fontSize: '1.1rem',
  padding: '0 15px',
  transition: 'color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  '&:hover': {
    color: colors.secondary,
  },
});

const NavLinksContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const HamburgerButton = styled(IconButton)({
  color: 'white', // Cambiar a un color visible
  fontSize: '2rem', // Ajustar el tamaño
  height: '100%',
  padding: '10px',
  zIndex: 1100,
  '@media (min-width: 769px)': {
    display: 'none',
  },
});

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Consultoría', path: '/consultoria' },
    { label: 'Formación', path: '/formacion' },
    { label: 'ChatBots', path: '/chatbots' }, // Enlace a la página completa de ChatBots
    { label: 'Mentorías', path: '/mentorias' },
    { label: 'Quiénes Somos', path: '/about' },
    { label: 'Contacto', path: '/contact' },
    { label: 'CosmicMind', path: '/cosmicmind' },
    //{ label: 'PanelVisionario', path: '/panelvisionario' },
    //{ label: 'Galería', path: '/gallery' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <NavbarContainer>
      <Toolbar sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '60px' }}>
        <LogoContainer component={Link} to="/">
          <Logo src={logo} alt="Logo" />
        </LogoContainer>
        <NavLinksContainer>
          {menuItems.map((item, index) => (
            <NavLink key={index} to={item.path}>{item.label}</NavLink>
          ))}
        </NavLinksContainer>
        <HamburgerButton edge="end" aria-label="menu" onClick={handleDrawerToggle}>
          <MenuIcon />
        </HamburgerButton>
      </Toolbar>
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </NavbarContainer>
  );
}
