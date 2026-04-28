import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export async function getTroubleshootingSteps(problem) {
  const { data } = await axios.post(`${BASE_URL}/troubleshoot`, { problem });
  return data;
}
