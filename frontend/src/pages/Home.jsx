import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>🖥️ PC-Docter-AI</h1>
      <p>Your AI-powered PC troubleshooting assistant.</p>
      <button onClick={() => navigate('/troubleshoot')}>
        Start Troubleshooting
      </button>
    </div>
  );
}
