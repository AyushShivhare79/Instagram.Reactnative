import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '@/assets/images/index';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Icons } from '@/assets/Icons/index';
import firestore, {
  arrayRemove,
  arrayUnion,
  doc,
  writeBatch,
} from '@react-native-firebase/firestore';
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
import { db } from '@/lib/firebase';
import { Posts } from '@/types/post';
import { COLORS } from '@/theme/color/color';
import { fetchPostsWithUsers } from '@/utils/firebaseHelper';
import AppImage from '@/components/Common/AppImage';
import FastImage from '@d11/react-native-fast-image';

export const ICON_SIZE = FONT_SIZE['2xl'];

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [status, setStatus] = useState();

  const user = useAppSelector(state => state.user.items);
  const posts = useAppSelector(state => state.posts.items);

  console.log("Posts: ", posts)
  
  const dispatch = useAppDispatch();

  const handleFollow = async (targetUserId: string) => {
    const currentUserId = user?.uid;
    if (!currentUserId || !targetUserId) return;

    const batch = writeBatch(db);

    const currentUserRef = doc(db, 'users', currentUserId);
    const targetUserRef = doc(db, 'users', targetUserId);

    batch.update(currentUserRef, {
      following: arrayUnion(targetUserId),
    });

    batch.update(targetUserRef, {
      followers: arrayUnion(currentUserId),
    });

    await batch.commit();

    dispatch(followUser({ targetUserId }));
  };

  const handleUnfollow = async (targetUserId: string) => {
    try {
      const currentUserId = user?.uid;
      if (!currentUserId || !targetUserId) return;

      const batch = writeBatch(db);

      const currentUserRef = doc(db, 'users', currentUserId);
      const targetUserRef = doc(db, 'users', targetUserId);

      batch.update(currentUserRef, {
        following: arrayRemove(targetUserId),
      });

      batch.update(targetUserRef, {
        followers: arrayRemove(currentUserId),
      });

      await batch.commit();
      dispatch(unfollowUser({ targetUserId }));
    } catch (error) {
      console.error('Unfollow error:', error);
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchPostsWithUsers();
      dispatch(setPosts(data));
    };

    load();
  }, [dispatch]);

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
      <View style={styles.statusContainer}>
        <FlatList
          data={status}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListStatusContainer}
          renderItem={({ item: _item }) => (
            <Avatar.Image size={70} source={Images.status} />
          )}
        />
      </View>
    );
  };

  if (!user) return navigation.navigate('Signin');

  const renderPosts = ({ item }: { item: Posts }) => {
    const currentUser = user;
    const author = item.user;

    const isMyPost = currentUser?.uid === author?.uid;
    const isFollowing = currentUser?.following?.includes(author?.uid);
    const isLiked = item?.likes?.includes(user?.uid);

    const avatarUri =
      item?.user?.profilePicture || (isMyPost ? user?.profilePicture : null);

    return (
      <View style={styles.renderPostsContainer}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderLeft}>
            <Avatar.Image
              size={40}
              source={avatarUri ? { uri: avatarUri } : Images.defaultProfile}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ViewProfile', {
                  id: item.user.uid,
                })
              }
            >
              <Text style={styles.usernameStyle}>{item.user.username}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.postHeaderRight}>
            {!isMyPost && (
              <CustomButton
                onPress={() =>
                  isFollowing
                    ? handleUnfollow(item?.user.uid)
                    : handleFollow(item?.user.uid)
                }
                variant="outline"
                title={isFollowing ? 'Unfollow' : 'Follow'}
              />
            )}
            <Icons.ThreeDotsIcon />
          </View>
        </View>

        <View style={styles.imageOuterBox}>
          <View style={styles.imageContainer}>
            <AppImage
              style={styles.image}
              uri={item.image}
              priority={'normal'}
              fallback={Images.postsFallback}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomIcons}>
            <View style={styles.bottomLeftIcons}>
              <TouchableOpacity onPress={() => handleLike(item.id, item.likes)}>
                <Icons.HeartIcon
                  size={ICON_SIZE}
                  fill={isLiked ? COLORS.red : 'none'}
                  stroke={isLiked ? 'none' : COLORS.black}
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

          <View style={styles.captionContainer}>
            <Text style={textStyles.semiBold}>{author.username} </Text>
            <Text style={textStyles.sm}>{item.caption}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />

      <View>
        <FlatList
          contentContainerStyle={styles.flatListPostContainer}
          data={posts}
          keyExtractor={(_, index) => String(index)}
          ListHeaderComponent={statusRender}
          renderItem={renderPosts}
        />
      </View>
    </SafeAreaView>
  );
}
