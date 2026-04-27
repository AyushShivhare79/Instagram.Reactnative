import { db } from '@/lib/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { arrayUnion, doc, setDoc } from '@react-native-firebase/firestore';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { requestNotificationPermission } from '@/lib/permissions/permissions';
import Toast from 'react-native-toast-message';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initFCM = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    const authStatus = await messaging().requestPermission();
    console.log('Auth status:', authStatus);

    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    return token;
  };

  const signinUser = async () => {
    const response = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );

    const token = await initFCM();

    await setDoc(
      doc(db, 'users', response.user.uid),
      {
        fcmTokens: arrayUnion(token),
      },
      { merge: true },
    );

    return Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  };

  return (
    <SafeAreaView>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      <TouchableOpacity
        onPress={signinUser}
        style={{
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          width: '80%',
          borderRadius: 50,
        }}
      >
        <Text style={{ color: 'white' }} variant="titleMedium">
          Signin
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
