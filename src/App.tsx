import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import SearchTab from './screens/Home/Search';
import { Search } from 'lucide-react-native';
import Upload from './screens/Home/Upload';
import Notifications from './screens/Home/Notifications';
import Profile from './screens/Home/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './screens/Auth/Signup';
import Signin from './screens/Auth/Signin';

import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useColorScheme } from 'react-native';
import { Icons } from './assets/Icons';

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeIcon = ({ focused }: { focused: boolean }) => <Icons.HouseIcon />;
const ReelsIcon = ({ focused }: { focused: boolean }) => <Icons.ReelsIcon />;
const MessageIcon = ({ focused }: { focused: boolean }) => <Icons.SendIcon />;
const SearchIcon = ({ focused }: { focused: boolean }) => <Icons.SearchIcon />;

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: HomeIcon,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ReelsIcon,
        }}
        name="Reels"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: MessageIcon,
        }}
        name="Message"
        component={SearchTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: SearchIcon,
        }}
        name="Search"
        component={SearchTab}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState(true);

  const colorScheme = useColorScheme();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(item => {
      setUser(item);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [initializing]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? MainStack() : AuthStack()}
    </NavigationContainer>
  );
}

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MyTabs} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
    </Stack.Navigator>
  );
};
