import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import FastImage from '@d11/react-native-fast-image';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './editprofile.styles';
import { openLibrary } from '@/components/HomeHeader/HomeHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import firestore from '@react-native-firebase/firestore';
import { TextInput } from 'react-native-paper';
import { uploadToCloudinary } from '@/lib/cloudnary';
import { updateProfilePicture } from '@/redux/slices/userSlice';
import { editProfileSchema } from '@/schema/EditProfile.schema';

type EditProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

export default function EditProfile({ navigation }: EditProfileProps) {
  const [uri, setUri] = useState<string>();

  const user = useAppSelector(state => state.user.items);
  const dispatch = useAppDispatch();

  const handleChange = async () => {
    const result = await openLibrary();
    const response = result?.uri;
    if (!response) return;
    setUri(response);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = async data => {};

  const testing = async () => {
    try {
      const currentUserId = user?.uid;
      if (!currentUserId) return;

      const response = await uploadToCloudinary(uri as string);

      const userRef = firestore().collection('users').doc(currentUserId);

      await userRef.update({
        profilePicture: response,
      });

      dispatch(updateProfilePicture(response));
    } catch (error) {
      console.log('Error updating profile picture:', error);
    }
  };

  const renderForm = () => {
    return (
      <>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your name"
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Username"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
            />
          )}
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}

        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Bio"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={val => onChange(val ? parseInt(val, 10) : '')}
              value={value}
              placeholder="Enter your age"
              keyboardType="default"
            />
          )}
        />
        {errors.bio && <Text style={styles.error}>{errors.bio.message}</Text>}

        <Controller
          control={control}
          name="website"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Website"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
            />
          )}
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Gender"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
            />
          )}
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}

        <CustomButton title="Save" onPress={handleSubmit(onSubmit)} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={handleChange} style={styles.imageContainer}>
          <FastImage
            style={[styles.image, styles.profilePicture]}
            source={{ uri: uri || user?.profilePicture! }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <Button onPress={testing} title="Test" />
      </View>
      <View style={{}}>{renderForm()}</View>
    </SafeAreaView>
  );
}
