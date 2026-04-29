import CustomButton from '../CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { AppUser } from '@/types/user';
import { Posts } from '@/types/post';
import { Text, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { textStyles } from '@/theme/typography/textStyles';
import { styles } from './profilecomponent.styles';
import { Images } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { db } from '@/lib/firebase';
import { arrayRemove, doc, setDoc } from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { ToastMessage } from '@/utils/toast';
import { setUser } from '@/redux/slices/userSlice';

interface ProfileComponentProps {
  user: AppUser;
  posts: Posts[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function ProfileComponent({
  user,
  posts,
  navigation,
}: ProfileComponentProps) {
  const me = useAppSelector(state => state.user.items);
  const isMe = user?.uid === me?.uid;

  const dispatch = useAppDispatch();

  const onLogout = async () => {
    if (!me) return;

    const token = await messaging().getToken();

    const removeToken = await setDoc(
      doc(db, 'users', me.uid),
      {
        fcmTokens: arrayRemove(token),
      },
      { merge: true },
    );

    console.log('Removed token response: ', removeToken);

    await signOut(getAuth());
    dispatch(setUser(null));
    return ToastMessage.success({
      title: 'Logout successful!',
    });
  };

  return (
    <>
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

      {isMe ? (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <CustomButton
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('EditProfile')}
            variant="outline"
            title="Edit Profile"
          />
          <CustomButton
            style={{ flex: 1 }}
            onPress={onLogout}
            variant="primary"
            title="Logout"
          />
        </View>
      ) : (
        <View>
          <CustomButton
            onPress={() => navigation.navigate('Message', { user2: user.uid })}
            variant="primary"
            title="Message"
          />
        </View>
      )}
    </>
  );
}
