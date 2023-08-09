import api from './api';

export async function hotelsListService(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
