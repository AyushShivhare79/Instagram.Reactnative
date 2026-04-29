import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './editprofile.styles';
import { openLibrary } from '@/components/HomeHeader/HomeHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { zodResolver } from '@hookform/resolvers/zod';
import firestore from '@react-native-firebase/firestore';
import { uploadToCloudinary } from '@/lib/cloudnary';
import { updateProfilePicture } from '@/redux/slices/userSlice';
import AppInput from '@/components/Form/FormInput';
import AppImage from '@/components/Common/AppImage';
import { Images } from '@/assets/images';
import { editProfileSchema } from '@/schema/EditProfile.schema';
import { useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';

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

  const onSubmit = async data => {
    try {
      const currentUserId = user?.uid;
      if (!currentUserId) return;

      const response = await uploadToCloudinary(uri as string);

      const userRef = firestore().collection('users').doc(currentUserId);

      await userRef.update({
        profilePicture: response,
      });

      dispatch(updateProfilePicture(response));
      navigation.goBack();
    } catch (error) {
      console.log('Error updating profile picture:', error);
    }
  };

  const renderForm = () => {
    return (
      <>
        <AppInput
          style={styles.input}
          control={control}
          name="name"
          placeholder="Name"
        />

        <AppInput
          style={styles.input}
          control={control}
          name="username"
          placeholder="Username"
        />

        <AppInput
          style={styles.input}
          control={control}
          name="bio"
          placeholder="Bio"
        />

        <AppInput
          style={styles.input}
          control={control}
          name="website"
          placeholder="Website"
        />

        <AppInput
          style={styles.input}
          control={control}
          name="gender"
          placeholder="Gender"
        />
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
          <AppImage
            style={[styles.image, styles.profilePicture]}
            uri={uri || user?.profilePicture!}
            fallbackSource={Images.defaultProfile}
          />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', flex: 1 }}>{renderForm()}</View>
      <CustomButton title="Save" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}
