import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '@/screens/Auth/Signup/Signup';
import Signin from '@/screens/Auth/Signin/Signin';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import Upload from '@/screens/Upload/Upload';
import CustomHeader from '@/components/Appbar';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser } from '@/redux/slices/userSlice';
import { BottomTabs } from './BottomTabNavigation';
import firestore from '@react-native-firebase/firestore';
import EditProfile from '@/screens/EditProfile/EditProfile';
import Profile from '@/screens/Profile/Profile';
import Messages from '@/screens/Messages/Message/Message';
import AppHeader from '@/components/AppHeader/AppHeader';

export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Signin: undefined;
  Upload: { url: string };
  EditProfile: undefined;
  Profile: { id: string };
  Message: { user2: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MyStack() {
  const [initializing, setInitializing] = useState(true);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.items);

  useEffect(() => {
    auth().onAuthStateChanged(async item => {
      const userData = await firestore()
        .collection('users')
        .doc(item?.uid)
        .get();

      dispatch(setUser({ ...userData?.data(), uid: item?.uid }));
      if (initializing) setInitializing(false);
    });
  }, [dispatch, initializing]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? MainStack() : AuthStack()}
    </NavigationContainer>
  );
}

const UploadHeader = () => <CustomHeader title="New Post" />;

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen
        name="Upload"
        options={{
          headerShown: true,
          header: UploadHeader,
        }}
        component={Upload}
      />
      <Stack.Screen name="Message" component={Messages} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const SignupHeader = () => <AppHeader title="Signup" />;
const LoginHeader = () => <AppHeader showBack={false} title="Login" />;

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ header: SignupHeader }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ header: LoginHeader }}
      />
    </Stack.Navigator>
  );
};
