import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import Search from './screens/Home/Search';
import Upload from './screens/Home/Upload';
import Notifications from './screens/Home/Notifications';
import Profile from './screens/Home/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './screens/Auth/Signup';

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
