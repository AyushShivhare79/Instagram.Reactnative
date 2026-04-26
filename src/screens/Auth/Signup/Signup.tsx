import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './signup.styles';
import { COLORS } from '@/theme/color/color';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '@/assets/images';
import CustomButton from '@/components/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { SignupSchema, signupSchema } from '@/schema/SignupSchema';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function Signup({ navigation }: SignupProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    const { username, name, email, password } = data;

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
  };


  const saveTokenToFirestore = async (token: string) => {
    const userId = user?.uid;
    if (!userId) return;

    await firestore()
      .collection('users')
      .doc(userId)
      .set(
        {
          fcmTokens: firestore.FieldValue.arrayUnion(token),
        },
        { merge: true },
      );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ gap: 30, padding: 10 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={Images.instaIcon}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                outlineColor="#E0E0E0"
                theme={{
                  roundness: 30,
                }}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                placeholder={'Username'}
                textColor={COLORS.black}
                style={styles.input}
              />
            )}
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username.message}</Text>
          )}

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                outlineColor="#E0E0E0"
                theme={{
                  roundness: 30,
                }}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                placeholder={'Name'}
                textColor={COLORS.black}
                style={styles.input}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                outlineColor="#E0E0E0"
                theme={{
                  roundness: 30,
                }}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                placeholder={'Email'}
                textColor={COLORS.black}
                style={styles.input}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                outlineColor="#E0E0E0"
                theme={{
                  roundness: 30,
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                placeholder={'Password'}
                textColor={COLORS.black}
                style={styles.input}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                outlineColor="#E0E0E0"
                theme={{
                  roundness: 30,
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                placeholder={'Confirm Password'}
                textColor={COLORS.black}
                style={styles.input}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
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
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 7,
          position: 'absolute',
          bottom: 50,
          left: 50,
          right: 50,
        }}
      >
        <CustomButton
          onPress={() => navigation.navigate('Signin')}
          variant="outline"
          title="Create new account"
        />
      </View>
    </SafeAreaView>
  );
}
