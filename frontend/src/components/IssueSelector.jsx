import { useState } from 'react';

export default function IssueSelector({ onSubmit }) {
  const [problem, setProblem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (problem.trim()) onSubmit(problem.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows={4}
        style={{ width: '100%' }}
        placeholder="e.g. My PC is running very slow and freezes often…"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <button type="submit" disabled={!problem.trim()}>
        Get Help
      </button>
    </form>
  );
}
