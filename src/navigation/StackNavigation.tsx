import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '@/screens/Auth/Signup';
import Signin from '@/screens/Auth/Signin';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import Upload from '@/screens/Upload/Upload';
import CustomHeader from '@/components/Appbar';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser } from '@/redux/slices/userSlice';
import { BottomTabs } from './BottomTabNavigation';

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
      <Stack.Screen name="Home" component={BottomTabs} />
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
