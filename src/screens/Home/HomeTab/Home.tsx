import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '@/assets/images/index';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Icons } from '@/assets/Icons/index';
import firestore from '@react-native-firebase/firestore';
import FastImage from '@d11/react-native-fast-image';
import { styles } from './home.styles';
import CustomButton from '@/components/CustomButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { followUser, unfollowUser } from '@/redux/slices/userSlice';
import { setPosts, toggleLike } from '@/redux/slices/postsSlice';
import { textStyles } from '@/theme/typography/textStyles';
import HomeHeader from '@/components/HomeHeader/HomeHeader';
import { FONT_SIZE } from '@/theme/typography/fontSizes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';

export const ICON_SIZE = FONT_SIZE['2xl'];

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [status, setStatus] = useState();
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

      const isLiked = postLikes.includes(currentUserId);
      const postRef = firestore().collection('posts').doc(postId);

      const updateAction = isLiked
        ? firestore.FieldValue.arrayRemove(currentUserId)
        : firestore.FieldValue.arrayUnion(currentUserId);

      await postRef.update({
        likes: updateAction,
      });

      dispatch(toggleLike({ postId, userId: currentUserId }));
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const statusRender = () => {
    return (
      <View style={{ padding: 8 }}>
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
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />

      <View>
        <FlatList
          contentContainerStyle={{ paddingVertical: 10 }}
          data={posts}
          keyExtractor={(_, index) => String(index)}
          ListHeaderComponent={statusRender}
          renderItem={({ item }) => {
            const isMe = user?.uid === item.userId;
            const isFollow = user?.following?.includes(item?.user?.uid);
            const isLiked = item?.likes?.includes(user?.uid);

            return (
              <View style={{ padding: 4, paddingBottom: 17 }}>
                <View style={styles.postHeader}>
                  <View style={styles.postHeaderLeft}>
                    <Avatar.Image
                      size={40}
                      source={
                        item?.user?.profilePicture
                          ? { uri: item.user.profilePicture }
                          : isMe && user?.profilePicture
                          ? { uri: user.profilePicture }
                          : Images.defaultProfile
                      }
                    />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Message', { user2: item.user.uid })
                      }
                    >
                      <Text style={textStyles.semiBold}>
                        {item.user.username}
                      </Text>
                    </TouchableOpacity>
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

                <View
                  style={{
                    paddingHorizontal: 3,
                    marginTop: 10,
                  }}
                >
                  <View style={styles.bottomIcons}>
                    <View style={styles.bottomLeftIcons}>
                      <TouchableOpacity
                        onPress={() => handleLike(item.id, item.likes)}
                      >
                        <Icons.HeartIcon
                          size={ICON_SIZE}
                          fill={isLiked ? 'red' : 'none'}
                          stroke={isLiked ? 'none' : 'black'}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Icons.CommentIcon size={ICON_SIZE} />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Icons.SendIcon size={ICON_SIZE} />
                      </TouchableOpacity>
                    </View>
                    <Icons.BookmarkIcon />
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 6 }}>
                    <Text style={textStyles.semiBold}>
                      {item.user.username}{' '}
                    </Text>
                    <Text style={textStyles.sm}>{item.caption}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
