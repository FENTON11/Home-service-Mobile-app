import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={ProfileScreen} />
      
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
}

