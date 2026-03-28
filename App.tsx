import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { LogBox, View } from 'react-native';
import { colors } from './src/theme/colors';

// Suppress specific warnings in development
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.deepBlue} />
      <NavigationContainer 
        fallback={<View style={{ flex: 1 }} />}
        onReady={() => {
          console.log('Navigation container ready');
        }}
        onStateChange={(state) => {
          const activeRoute = state?.routes?.[state?.index ?? 0]?.name;
          if (activeRoute) {
            console.log('Navigation state changed:', activeRoute);
          }
        }}
      >
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
