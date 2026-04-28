import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ step, index }) {
  return (
    <View style={styles.bubble}>
      <Text style={styles.index}>{index}.</Text>
      <Text style={styles.text}>{step}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  index: { fontWeight: 'bold', marginRight: 8, color: '#2563eb' },
  text: { flex: 1, fontSize: 14, color: '#333' },
});
