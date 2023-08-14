import api from './api';

export async function getActivities() {
  const response = await api.get('/activities');
  return response.data;
}

export async function getActivitiesDate() {
  const response = await api.get('/activities/dates');
  return response.data;
}

export async function getSelectActivities(token) {
  const response = await api.get('/activities/select', {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return response.data;
}

export async function postActivity(activityId, token) {
  console.log(activityId, token);
  const response = await api.post(`/activities/select/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return response.data;
}
