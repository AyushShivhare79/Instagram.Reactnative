import { setViewUserProfile } from '@/redux/slices/userPostsSlice';
import { View } from 'react-native';
import { styles } from './profile.styles';
import { Divider } from 'react-native-paper';
import { TopTabs } from '@/navigation/TopTabNavigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useCallback, useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileComponent from '@/components/Profile/ProfileComponent';
import Loading from '@/components/Loading/loading';
import { setUserPosts } from '@/redux/slices/postsSlice';

export default function Profile() {
  const [loading, setLoading] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.items);
  const posts = useAppSelector(state => state.posts.userPosts);

  useFocusEffect(
    useCallback(() => {
      dispatch(setViewUserProfile(user));
      setLoading(false);

      return () => {
        dispatch(setViewUserProfile(null));
        dispatch(setUserPosts(null));

      };
    }, [dispatch, user]),
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProfileHeader />

          <ProfileComponent
            user={user!}
            posts={posts!}
            navigation={navigation}
          />

          <Divider />

          <View style={styles.bottomSection}>
            <TopTabs />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
