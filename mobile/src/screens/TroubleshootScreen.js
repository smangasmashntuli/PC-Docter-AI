import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import { getTroubleshootingSteps } from '../services/api';

export default function TroubleshootScreen() {
  const [problem, setProblem] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!problem.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getTroubleshootingSteps(problem.trim());
      setSteps(result.steps);
    } catch {
      setError('Could not fetch troubleshooting steps. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Describe your problem:</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="e.g. My laptop screen is black…"
        value={problem}
        onChangeText={setProblem}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>Get Help</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {steps.map((step, i) => (
        <ChatBubble key={i} step={step} index={i + 1} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, textAlignVertical: 'top', marginBottom: 12 },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  error: { color: 'red', marginTop: 12 },
});
