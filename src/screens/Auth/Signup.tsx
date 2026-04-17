import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupUser = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    const response = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );

    await firestore().collection('users').doc(response.user.uid).set({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: response.user.email,
      following: 0,
      followers: 0,
      uid: response.user.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <SafeAreaView>
      <TextInput label="Username" value={username} onChangeText={setUsername} />
      <TextInput label="Name" value={name} onChangeText={setName} />
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
