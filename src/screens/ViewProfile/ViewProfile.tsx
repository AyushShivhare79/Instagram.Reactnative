import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './viewprofile.styles';
import { Divider } from 'react-native-paper';
import { TopTabs } from '@/navigation/TopTabNavigation';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { doc, getDoc } from '@react-native-firebase/firestore';
import { setViewUserProfile } from '@/redux/slices/userPostsSlice';
import ProfileComponent from '@/components/Profile/ProfileComponent';
import { db } from '@/lib/firebase';
import Loading from '@/components/Loading/loading';
import { setUserPosts } from '@/redux/slices/postsSlice';

export default function ViewProfile() {
  const [loading, setLoading] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<RootStackParamList, 'ViewProfile'>>();
  const id = route.params?.id;

  const user = useAppSelector(state => state.viewProfile.items);
  const posts = useAppSelector(state => state.posts.userPosts);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setViewUserProfile(null));
        dispatch(setUserPosts(null));
      };
    }, [dispatch]),
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const formattedUser = {
            ...data,
            createdAt: data?.createdAt?.toDate().toISOString(),
          };

          dispatch(setViewUserProfile(formattedUser));
          console.log('See does it? : ', user);
        } else {
          console.log('No such user!');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, id]);

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
