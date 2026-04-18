import { Timestamp } from 'firebase/firestore';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Images } from '@/assets/images/index';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Icons } from '@/assets/Icons/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import FastImage from '@d11/react-native-fast-image';
import { styles } from './home.styles';
import CustomButton from '@/components/CustomButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { followUser, unfollowUser } from '@/redux/slices/userSlice';
import { setPosts } from '@/redux/slices/postsSlice';

const openLibrary = async () => {
  try {
    const granted = await requestPermission();

    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) return;

    if (result.errorCode) {
      console.log('Error:', result.errorMessage);
      return;
    }

    if (result.assets?.length) {
      const asset = result.assets[0];

      const img = {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || `photo_${Date.now()}.jpg`,
      };

      return img;
    }
  } catch (err) {
    console.log('Picker Error:', err);
  }
};

type user = {
  uid: string;
  email: string;
  name: string;
  username: string;
};
export interface Posts {
  id: string;
  image: string;
  user: user;
  likes: string[];
  caption: string;
  userId: string;
  createdAt: Timestamp;
}

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [status, setStatus] = useState(Array(10).fill({}));

  const user = useAppSelector(state => state.user.items);
  const posts = useAppSelector(state => state.posts.items);

  const dispatch = useAppDispatch();

  const handleFollow = async (targetUserId: string) => {
    try {
      const currentUserId = user?.uid;
      if (!currentUserId || !targetUserId) return;

      await firestore()
        .collection('users')
        .doc(currentUserId)
        .update({
          following: firestore.FieldValue.arrayUnion(targetUserId),
        });

      await firestore()
        .collection('users')
        .doc(targetUserId)
        .update({
          followers: firestore.FieldValue.arrayUnion(currentUserId),
        });

      dispatch(followUser({ targetUserId }));
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  const handleUnfollow = async (targetUserId: string) => {
    try {
      const currentUserId = user?.uid;

      if (!currentUserId || !targetUserId) return;

      const batch = firestore().batch();

      const currentUserRef = firestore().collection('users').doc(currentUserId);
      const targetUserRef = firestore().collection('users').doc(targetUserId);

      batch.update(currentUserRef, {
        following: firestore.FieldValue.arrayRemove(targetUserId),
      });

      batch.update(targetUserRef, {
        followers: firestore.FieldValue.arrayRemove(currentUserId),
      });

      dispatch(unfollowUser({ targetUserId }));

      await batch.commit();
    } catch (error) {
      console.error('Unfollow error:', error);
    }
  };

  const getPosts = async () => {
    try {
      const postSnapshot = await firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get();

      const rawPosts = postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userIds = [...new Set(rawPosts.map(post => post?.userId))];

      const userDocs = await Promise.all(
        userIds.map(id => firestore().collection('users').doc(id).get()),
      );

      const userMap = {};

      userDocs.forEach(doc => {
        if (doc.exists) {
          userMap[doc.id] = doc.data();
        }
      });

      const finalData = rawPosts.map(post => ({
        ...post,
        user: userMap[post.userId] || null,
      }));

      console.log('Final data: ', finalData);
      dispatch(setPosts(finalData));
      // setPosts(finalData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleLike = async (postId: string, postLikes: string[]) => {
    try {
      const currentUserId = user?.uid;
      if (!currentUserId) return;

      const isAlreadyLiked = postLikes.includes(currentUserId);
      const postRef = firestore().collection('posts').doc(postId);

      if (isAlreadyLiked) {
        const response = await postRef.update({
          likes: firestore.FieldValue.arrayRemove(currentUserId),
        });

        return setPosts(prev =>
          prev.map(post => {
            if (post.id !== postId) return post;

            return {
              ...post,
              likes: post.likes.filter(id => id !== currentUserId),
            };
          }),
        );
      }

      const response = await postRef.update({
        likes: firestore.FieldValue.arrayUnion(currentUserId),
      });

      setPosts(prev =>
        prev.map(post => {
          if (post.id !== postId) return post;

          return {
            ...post,
            likes: [...post.likes, currentUserId],
          };
        }),
      );
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleUpload = async () => {
    const result = await openLibrary();
    const uri = result?.uri;
    if (!uri) return;
    navigation.navigate('Upload', { url: uri });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={handleUpload}>
          <Icons.PlusIcon />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <FastImage
            style={styles.image}
            source={Images.instaLogo}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Icons.HeartIcon />
      </View>

      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListStatusContainer}
          data={status}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item: _item }) => (
            <Avatar.Image size={70} source={Images.status} />
          )}
        />
      </View>

      <View>
        <FlatList
          contentContainerStyle={{ paddingVertical: 10 }}
          data={posts}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => {
            const isMe = user?.uid === item.userId;
            const isFollow = user?.following?.includes(item?.user?.uid);
            console.log('Yess: ', user?.following.includes(item?.user.uid));

            return (
              <View style={{ padding: 10 }}>
                <View style={styles.postHeader}>
                  <View style={styles.postHeaderLeft}>
                    <Avatar.Image size={40} source={Images.status} />
                    <Text>{item.user.username}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {!isMe && (
                      <CustomButton
                        onPress={() =>
                          isFollow
                            ? handleUnfollow(item?.user.uid)
                            : handleFollow(item?.user.uid)
                        }
                        variant="outline"
                        title={isFollow ? 'Unfollow' : 'Follow'}
                      />
                    )}
                    <Icons.ThreeDotsIcon />
                  </View>
                </View>

                <View style={styles.imageOuterBox}>
                  <View style={styles.imageContainer}>
                    <FastImage
                      style={styles.image}
                      source={{
                        uri: item.image,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </View>

                <View style={styles.bottomIcons}>
                  <View style={styles.bottomLeftIcons}>
                    <TouchableOpacity
                      onPress={() => handleLike(item.id, item.likes)}
                    >
                      <Icons.HeartIcon
                        size={28}
                        fill={item?.likes?.includes(user?.uid) ? 'red' : 'null'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Icons.CommentIcon size={28} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Icons.SendIcon size={28} />
                    </TouchableOpacity>
                  </View>
                  <Icons.BookmarkIcon />
                </View>

                <Text>{item.caption}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};
