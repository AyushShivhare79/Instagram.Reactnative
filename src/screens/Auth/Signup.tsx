import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupUser = async () => {
    const response = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );

    console.log('Response: ', response);
  };

  return (
    <SafeAreaView>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      <TouchableOpacity
        onPress={signupUser}
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
          Signup
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
