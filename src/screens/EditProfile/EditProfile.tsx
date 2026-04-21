import { useAppSelector } from '@/hooks/redux';
import FastImage from '@d11/react-native-fast-image';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './editprofile.styles';
import { openLibrary } from '@/components/HomeHeader/HomeHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod/v3';
import { zodResolver } from '@hookform/resolvers/zod';

type EditProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

export default function EditProfile({ navigation }: EditProfileProps) {
  const [uri, setUri] = useState<string>();

  const user = useAppSelector(state => state.user.items);

  const handleChange = async () => {
    const result = await openLibrary();
    const response = result?.uri;
    if (!response) return;
    setUri(response);
  };

  const editProfileSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name is too long' })
      .trim(),

    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(30, { message: 'Username too long' })
      .regex(/^[a-zA-Z0-9._]+$/, {
        message: 'Only letters, numbers, dot and underscore allowed',
      }),

    bio: z
      .string()
      .max(150, { message: 'Bio must be under 150 characters' })
      .optional(),

    website: z.string().url({ message: 'Invalid URL' }).optional(),
    gender: z.enum(['male', 'female']).optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  const renderForm = () => {
    return (
      <View style={styles.container}>
        <Text>Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your name"
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text>Username</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
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

        <Text>Bio</Text>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={val => onChange(val ? parseInt(val, 10) : '')}
              value={value}
              placeholder="Enter your age"
              keyboardType="numeric"
            />
          )}
        />
        {errors.bio && <Text style={styles.error}>{errors.bio.message}</Text>}

        <Text>Website</Text>
        <Controller
          control={control}
          name="website"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
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

        <Text>Gender</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
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
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleChange} style={styles.imageContainer}>
        <FastImage
          style={[styles.image, styles.profilePicture]}
          source={{ uri: uri || user?.profilePicture! }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {renderForm()}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
