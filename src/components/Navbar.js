import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItemButton, ListItemText, useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { colors } from '../theme';
import { ReactComponent as UCogNetIcon } from '../assets/ucognet_icon_A_U-Gate.svg';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Proof', to: '/proof' },
  { label: 'Safety', to: '/safety' },
  { label: 'Research', to: '/research' },
  { label: 'Updates', to: '/updates' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 40 });
  const location = useLocation();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(8,15,26,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid ${colors.border}` : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mr: 'auto', cursor: 'pointer', textDecoration: 'none' }}
          >
            <Box
              sx={{
                width: 36, height: 36, borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { transform: 'rotate(15deg) scale(1.08)' },
                '& svg': { width: '100%', height: '100%' },
              }}
            >
              <UCogNetIcon />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.textPrimary, fontSize: '1.05rem' }}>
              UCogNet
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mr: 2 }}>
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    color: active ? colors.accent : colors.textSecondary,
                    fontSize: '0.85rem', fontWeight: active ? 600 : 500,
                    '&:hover': { color: colors.textPrimary, background: 'transparent' },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* CTA buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              component={RouterLink}
              to="/technical-note"
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.82rem', px: 2 }}
            >
              Technical note
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              size="small"
              sx={{ fontSize: '0.82rem', px: 2 }}
            >
              Request a demo
            </Button>
          </Box>

          {/* Mobile menu */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: 'none' }, color: colors.textPrimary }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, background: colors.surface, borderLeft: `1px solid ${colors.border}` } }}
      >
        <List sx={{ pt: 4 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.label}
              component={RouterLink}
              to={item.to}
              onClick={() => setDrawerOpen(false)}
              selected={location.pathname === item.to}
            >
              <ListItemText primary={item.label} sx={{ '& .MuiListItemText-primary': { fontWeight: 500, fontSize: '0.95rem' } }} />
            </ListItemButton>
          ))}
          <Box sx={{ px: 2, pt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button component={RouterLink} to="/technical-note" variant="outlined" size="small" fullWidth onClick={() => setDrawerOpen(false)}>
              Technical note
            </Button>
            <Button component={RouterLink} to="/contact" variant="contained" size="small" fullWidth onClick={() => setDrawerOpen(false)}>
              Request a demo
            </Button>
          </Box>
        </List>
      </Drawer>
    </>
  );
}
