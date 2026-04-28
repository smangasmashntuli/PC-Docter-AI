import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function getTroubleshootingSteps(problem) {
  const { data } = await axios.post(`${BASE_URL}/troubleshoot`, { problem });
  return data;
}
