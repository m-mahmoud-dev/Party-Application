import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { ElectoralScreen } from '../screens/ElectoralScreen';
import { HomeDashboardScreen } from '../screens/HomeDashboardScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { MapScreen } from '../screens/MapScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { RootStackParamList } from '../types/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeDashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Payments" component={PaymentScreen} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Electoral" component={ElectoralScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
