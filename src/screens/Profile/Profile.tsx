import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './profile.styles';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '@/assets/images/index';
import { Divider } from 'react-native-paper';
import { useAppSelector } from '@/hooks/redux';
import { TopTabs } from '@/navigation/TopTabNavigation';
import { textStyles } from '@/theme/typography/textStyles';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import firestore from '@react-native-firebase/firestore';

export default function Profile() {
  const route = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const id = route.params?.id;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const reduxUser = useAppSelector(state => state.user.items);
  const posts = useAppSelector(state => state.posts.userPosts);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const docSnap = await firestore().collection('users').doc(id).get();

      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    };

    fetchUser();
  }, [id]);

  // fallback → if it's your own profile
  const displayUser = id ? user : reduxUser;

  if (!displayUser) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />

      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={[styles.image, styles.profilePicture]}
            source={
              displayUser?.profilePicture
                ? { uri: displayUser.profilePicture }
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
          <Text style={styles.countText}>
            {displayUser?.followers?.length || 0}
          </Text>
          <Text style={styles.labelText}>Followers</Text>
        </View>

        <View>
          <Text style={styles.countText}>
            {displayUser?.following?.length || 0}
          </Text>
          <Text style={styles.labelText}>Following</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 4, marginBottom: 5 }}>
        <Text style={[{ color: 'black' }, textStyles.base, textStyles.medium]}>
          {displayUser?.firstName}
        </Text>
        <Text style={textStyles.sm}>{displayUser?.bio || 'No bio'}</Text>
      </View>

      {!id && (
        <CustomButton
          onPress={() => navigation.navigate('EditProfile')}
          variant="outline"
          title="Edit Profile"
        />
      )}

      <Divider />

      <View style={styles.bottomSection}>
        <TopTabs userId={id} />
      </View>
    </SafeAreaView>
  );
}
