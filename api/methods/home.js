import api from '@/api/api';

export async function getHomeData() {
  const { data } = await api.get('/api/front/data');
  return data.data;
}
