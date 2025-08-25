import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
  const { userId } = useParams(); // Extrae el parámetro dinámico de la URL
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://efficientai.es/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
      } catch (err) {
        setError("Error al cargar los datos del usuario.");
        console.error(err);
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Correo: {user.email}</p>
      <p>Teléfono: {user.phone_number}</p>
      <p>Registrado desde: {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default UserPage;
