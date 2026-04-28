import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖥️ PC-Docter-AI</Text>
      <Text style={styles.subtitle}>AI-powered PC troubleshooting assistant</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Troubleshoot')}
      >
        <Text style={styles.buttonText}>Start Troubleshooting</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 32, textAlign: 'center' },
  button: { backgroundColor: '#2563eb', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
