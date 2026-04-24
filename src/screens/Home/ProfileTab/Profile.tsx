import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { styles } from './profile.styles';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '@/assets/images/index';
import { Divider } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { TopTabs } from '@/navigation/TopTabNavigation';
import { textStyles } from '@/theme/typography/textStyles';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { setViewUserProfile } from '@/redux/slices/userPostsSlice';
import { useCallback } from 'react';

export default function Profile() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.items);
  const posts = useAppSelector(state => state.posts.userPosts);

  useFocusEffect(
    useCallback(() => {
      dispatch(setViewUserProfile(user));

      return () => {
        dispatch(setViewUserProfile(null));
      };
    }, [dispatch, user]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />

      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={[styles.image, styles.profilePicture]}
            source={
              user?.profilePicture
                ? { uri: user.profilePicture }
                : Images.defaultProfile
            }
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View>
          <Text style={styles.countText}>{posts?.length || 0}</Text>
          <Text style={styles.labelText}>Posts</Text>
        </View>

        <View>
          <Text style={styles.countText}>{user?.followers?.length || 0}</Text>
          <Text style={styles.labelText}>Followers</Text>
        </View>

        <View>
          <Text style={styles.countText}>{user?.following?.length || 0}</Text>
          <Text style={styles.labelText}>Following</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 4, marginBottom: 5 }}>
        <Text style={[{ color: 'black' }, textStyles.base, textStyles.medium]}>
          {user?.name}
        </Text>
        <Text style={textStyles.sm}>{user?.bio || 'No bio'}</Text>
      </View>

      <CustomButton
        onPress={() => navigation.navigate('EditProfile')}
        variant="outline"
        title="Edit Profile"
      />

      <Divider />

      <View style={styles.bottomSection}>
        <TopTabs />
      </View>
    </SafeAreaView>
  );
}
