import { setViewUserProfile } from '@/redux/slices/userPostsSlice';
import { View } from 'react-native';
import { styles } from './profile.styles';
import { Divider } from 'react-native-paper';
import { TopTabs } from '@/navigation/TopTabNavigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useCallback } from 'react';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileComponent from '@/components/Profile/ProfileComponent';

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
    <>
      <SafeAreaView style={styles.container}>
        <ProfileHeader />

        <ProfileComponent user={user!} posts={posts!} navigation={navigation} />

        <Divider />

        <View style={styles.bottomSection}>
          <TopTabs />
        </View>
      </SafeAreaView>
    </>
  );
}
