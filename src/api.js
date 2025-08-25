const API_BASE_URL = '/openai-service';

export const initializeSession = async () => {
  const response = await fetch(`${API_BASE_URL}/initialize-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  return await response.json();
};
