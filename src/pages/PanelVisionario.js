import React, { useState, useEffect } from 'react';

// Componente para mostrar una tarjeta de objetivo
const GoalCard = ({ goal, onEdit, onDelete, onMove, onToggleStep }) => {
  const { title, deadline, steps, id } = goal;

  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>Plazo: {new Date(deadline).toLocaleDateString()}</p>
      <h4>Pasos:</h4>
      <ol>
        {steps.map((step, index) => (
          <li key={index} style={{ textDecoration: step.completed ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={step.completed}
              onChange={() => onToggleStep(id, index)}
              style={styles.checkbox}
            />
            {step.description}
          </li>
        ))}
      </ol>
      <button onClick={() => onEdit(id)} style={styles.button}>Editar</button>
      <button onClick={() => onDelete(id)} style={{ ...styles.button, color: 'red' }}>Eliminar</button>
      <button onClick={() => onMove(id)} style={styles.button}>Mover</button>
    </div>
  );
};

const createGoalInAPI = async (title, deadline) => {
  try {
    const response = await fetch('https://efficientai.es/webapp-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from_user: 'temporal_user',
        message_body: `Meta: ${title}, Plazo: ${deadline}`,
        assistant_name: 'efficientai',
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (data.status === 'success' && data.assistant_response) {
      const steps = data.assistant_response.split('\n').filter(Boolean).map((step, index) => ({
        step_number: index + 1,
        description: step.trim(),
        completed: false, // Se agrega para permitir palomear los pasos
      }));

      return {
        id: data.goal_id || Date.now(),
        title,
        deadline,
        steps,
      };
    } else {
      throw new Error('Error al procesar la respuesta del servidor. Inténtalo nuevamente.');
    }
  } catch (err) {
    console.error('Error creando el objetivo:', err.message);
    throw new Error('Error creando el objetivo. Intenta nuevamente.');
  }
};

const VisionaryPanel = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', deadline: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_URL = 'https://efficientai.es/api';
  const WS_URL = 'ws://localhost:8000/ws/goals';

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const response = await fetch(`${API_URL}/goals`);
        if (!response.ok) throw new Error('Error al cargar los objetivos');
        const data = await response.json();
        if (data.status === 'success') {
          setGoals(data.goals.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } else {
          throw new Error('Error al cargar los objetivos');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadGoals();

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('Conexión WebSocket abierta');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === 'goal_created') {
        setGoals((prev) => [message.goal, ...prev]); // Insertar al inicio
      } else if (message.event === 'goal_updated') {
        setGoals((prev) =>
          prev.map((goal) => (goal.id === message.goal.id ? message.goal : goal))
        );
      } else if (message.event === 'goal_deleted') {
        setGoals((prev) => prev.filter((goal) => goal.id !== message.goal_id));
      }
    };

    ws.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket cerrado');
    };

    return () => ws.close();
  }, [API_URL, WS_URL]);

  const handleCreateGoal = async () => {
    const { title, deadline } = newGoal;

    if (!title || !deadline) {
      setError('Por favor, completa el título y el plazo.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const newGoal = await createGoalInAPI(title, deadline);
      setGoals((prevGoals) => [newGoal, ...prevGoals]); // Añadir la nueva meta al inicio
    } catch (err) {
      setError(err.message);
      window.location.reload(); // Recargar también si hay error
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStep = (goalId, stepIndex) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              steps: goal.steps.map((step, index) =>
                index === stepIndex ? { ...step, completed: !step.completed } : step
              ),
            }
          : goal
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1>Tu Panel Visionario</h1>
      <p>Visualiza y alcanza tus metas con facilidad.</p>

      <div style={styles.form}>
        <h3>Crea tu nuevo objetivo</h3>
        <input
          type="text"
          placeholder="Título de la meta"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleCreateGoal} disabled={loading} style={styles.button}>
          {loading ? 'Creando...' : 'Crear Meta'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>

      <div>
        <h3>Todos los objetivos</h3>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={(id) => console.log(`Editar: ${id}`)}
              onDelete={(id) => console.log(`Eliminar: ${id}`)}
              onMove={(id) => console.log(`Mover: ${id}`)}
              onToggleStep={handleToggleStep}
            />
          ))
        ) : (
          <p>No hay objetivos creados aún. ¡Comienza añadiendo uno!</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    width: '100%',
  },
  card: {
    border: '1px solid #ddd',
    padding: '15px',
    margin: '10px',
    borderRadius: '8px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  checkbox: {
    marginRight: '10px',
  },
};

export default VisionaryPanel;
