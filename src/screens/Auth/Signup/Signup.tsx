import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './signup.styles';
import { COLORS } from '@/theme/color/color';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '@/assets/images';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { SignupSchema, signupSchema } from '@/schema/Signup.schema';
import { ToastMessage } from '@/utils/toast';
import AppInput from '@/components/Form/FormInput';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function Signup({ navigation }: SignupProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    const { username, name, email, password } = data;

    try {
      const response = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );

      await firestore().collection('users').doc(response.user.uid).set({
        username: username,
        profilePicture: null,
        name: name,
        email: email,
        following: [],
        followers: [],
        bio: null,
        website: null,
        gender: null,
        uid: response.user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return ToastMessage.success({
        title: 'Signup successful!',
      });
    } catch (error) {
      console.log(error);
      return ToastMessage.error({
        title: 'Error while signup!',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.imageOuterBox}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={Images.instaIcon}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>

        <View>
          <AppInput
            control={control}
            name="username"
            placeholder="Username"
            style={styles.input}
          />

          <AppInput
            control={control}
            name="name"
            placeholder="Name"
            style={styles.input}
          />

          <AppInput
            control={control}
            name="email"
            placeholder="Email"
            style={styles.input}
          />

          <AppInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          <AppInput
            control={control}
            name="password"
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
            >
              <Text style={{ color: COLORS.white }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Divider />

        <View style={styles.bottomTextAlign}>
          <Text style={{ color: COLORS.black }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={{ color: COLORS.blue }}>Sign In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
