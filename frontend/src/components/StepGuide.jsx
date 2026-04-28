export default function StepGuide({ steps }) {
  return (
    <div>
      <h3>Troubleshooting Steps</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
