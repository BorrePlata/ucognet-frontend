// src/components/FloatingActionButton.js
import React from 'react';
import { Fab } from '@mui/material';
import { styled } from '@mui/system';


const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#1E88E5',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
});

export default function FloatingActionButton({ icon, onClick }) {
  return (
    <StyledFab onClick={onClick}>
      {icon}
    </StyledFab>
  );
}
