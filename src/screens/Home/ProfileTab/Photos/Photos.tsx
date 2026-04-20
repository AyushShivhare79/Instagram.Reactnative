import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FastImage from '@d11/react-native-fast-image';
import { styles } from './photos.styles';
import { setUserPosts } from '@/redux/slices/postsSlice';

export default function Photos() {
  const user = useAppSelector(state => state.user.items);
  const posts = useAppSelector(state => state.posts.userPosts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snapshot = await firestore()
          .collection('posts')
          .where('userId', '==', user?.uid)
          .orderBy('createdAt', 'desc')
          .get();

        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc?._data,
        }));

        dispatch(setUserPosts(postsData));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{ gap: 10 }}
        numColumns={3}
        data={posts}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.imageContainer}>
                <FastImage
                  style={styles.image}
                  source={{
                    uri: item?.image,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
