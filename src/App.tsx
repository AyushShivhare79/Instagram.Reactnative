import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/HomeTab/Home';
import SearchTab from './screens/Home/Search';
import Profile from './screens/Home/ProfileTab/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './screens/Auth/Signup';
import Signin from './screens/Auth/Signin';
import { Images } from './assets/images/index';

import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Icons } from './assets/Icons';
import { Avatar, PaperProvider } from 'react-native-paper';
import Upload from './screens/Upload/Upload';
import CustomHeader from './components/Appbar';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { setUser } from './redux/slices/userSlice';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ToastMessage from 'react-native-toast-message';

export type BottomTabParamList = {
  Home: undefined;
  Reels: undefined;
  Message: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeIcon = ({ focused }: { focused: boolean }) => <Icons.HouseIcon />;
const ReelsIcon = ({ focused }: { focused: boolean }) => <Icons.ReelsIcon />;
const MessageIcon = ({ focused }: { focused: boolean }) => <Icons.SendIcon />;
const SearchIcon = ({ focused }: { focused: boolean }) => <Icons.SearchIcon />;
const ProfileIcon = () => <Avatar.Image size={24} source={Images.status} />;

function MyTabs() {
  return (
    <PaperProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarActiveTintColor: '#e91e63',
          tabBarActiveBackgroundColor: '#f0f0f0',
          tabBarInactiveTintColor: 'gray',
        }}
      >
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
          component={SearchTab}
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
        <Tab.Screen
          options={{
            tabBarIcon: ProfileIcon,
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}

export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Signin: undefined;
  Upload: { url: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MyStack() {
  const [initializing, setInitializing] = useState(true);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.items);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(item => {
      dispatch(setUser(item));
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [dispatch, initializing]);

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
      <Stack.Screen
        name="Upload"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="New Post" />,
        }}
        component={Upload}
      />
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

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ToastMessage />
        <MyStack />
      </PaperProvider>
    </Provider>
  );
}
