const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const auth = {
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getUser: async () => {
    const response = await fetch(`${API_URL}/auth/user`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },
};

export const assessment = {
  save: async (data: { answers: any; results: any }) => {
    const response = await fetch(`${API_URL}/assessment/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getHistory: async () => {
    const response = await fetch(`${API_URL}/assessment/history`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },
}; 