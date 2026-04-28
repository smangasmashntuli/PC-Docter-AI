import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TroubleshootScreen from './src/screens/TroubleshootScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '🖥️ PC-Docter-AI' }} />
        <Stack.Screen name="Troubleshoot" component={TroubleshootScreen} options={{ title: 'Troubleshoot' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
