// src/components/TeamSection.js
import React from 'react';
import { Grid, Card, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';

const TeamCard = styled(Card)({
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
});

const IconContainer = styled(Box)({
  fontSize: '3rem',
  marginBottom: '10px',
});

export default function TeamSection({ members }) {
  return (
    <Box textAlign="center" padding="40px 0">
      <Typography variant="h5" gutterBottom>Nuestro Equipo</Typography>
      <Grid container spacing={3} justifyContent="center">
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <TeamCard>
              <IconContainer>
                <Avatar src={member.image} alt={member.name} style={{ width: '100px', height: '100px' }} />
              </IconContainer>
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2">{member.role}</Typography>
            </TeamCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
