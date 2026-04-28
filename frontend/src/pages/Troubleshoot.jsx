import { useState } from 'react';
import IssueSelector from '../components/IssueSelector.jsx';
import StepGuide from '../components/StepGuide.jsx';
import { getTroubleshootingSteps } from '../services/api.js';

export default function Troubleshoot() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(problem) {
    setLoading(true);
    setError(null);
    try {
      const result = await getTroubleshootingSteps(problem);
      setSteps(result.steps);
    } catch {
      setError('Could not fetch troubleshooting steps. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <h2>Describe your problem</h2>
      <IssueSelector onSubmit={handleSubmit} />
      {loading && <p>Loading steps…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {steps.length > 0 && <StepGuide steps={steps} />}
    </div>
  );
}
