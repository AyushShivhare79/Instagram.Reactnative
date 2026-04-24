import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { View } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './viewprofile.styles';
import { Divider } from 'react-native-paper';
import { TopTabs } from '@/navigation/TopTabNavigation';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import firestore from '@react-native-firebase/firestore';
import { setViewUserProfile } from '@/redux/slices/userPostsSlice';
import ProfileComponent from '@/components/Profile/ProfileComponent';

export default function ViewProfile() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route = useRoute<RouteProp<RootStackParamList, 'ViewProfile'>>();
  const id = route.params?.id;

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.viewProfile.items);
  const posts = useAppSelector(state => state.posts.userPosts);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      const docSnap = await firestore().collection('users').doc(id).get();

      if (!docSnap.exists) return;

      dispatch(setViewUserProfile(docSnap.data()));
    };

    fetchUser();
  }, [dispatch, id]);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />

      <ProfileComponent user={user!} posts={posts!} navigation={navigation} />

      <Divider />

      <View style={styles.bottomSection}>
        <TopTabs />
      </View>
    </SafeAreaView>
  );
}
