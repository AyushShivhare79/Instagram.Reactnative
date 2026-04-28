import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  collection,
  FirebaseFirestoreTypes,
  getDocs,
  query,
  where,
} from '@react-native-firebase/firestore';
import { styles } from './photos.styles';
import { setUserPosts } from '@/redux/slices/postsSlice';
import Loading from '@/components/Loading/loading';
import { db } from '@/lib/firebase';
import { useFocusEffect } from '@react-navigation/native';
import AppImage from '@/components/Common/AppImage';
import { Images } from '@/assets/images';
import { serializeTimestamps } from '@/utils/firebaseHelper';

export default function Photos() {
  const [loading, setLoading] = useState(true);

  const userId = useAppSelector(state => state.viewProfile.items?.uid);
  const posts = useAppSelector(state => state.posts.userPosts);

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setUserPosts(null));
      };
    }, [dispatch]),
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!userId) return;

        const q = query(collection(db, 'posts'), where('userId', '==', userId));

        const snapshot: FirebaseFirestoreTypes.QuerySnapshot = await getDocs(q);

        if (snapshot.empty) {
          dispatch(setUserPosts(null));
          return;
        }

        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...serializeTimestamps(doc.data()),
        }));

        dispatch(setUserPosts(postsData));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [userId, dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          columnWrapperStyle={styles.flatListStyle}
          numColumns={3}
          data={posts}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.imageContainer}>
                  <AppImage
                    style={styles.image}
                    uri={item.image}
                    priority={'normal'}
                    fallback={Images.postsFallback}
                  />
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
