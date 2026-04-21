import { Text, View } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './profile.styles';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '@/assets/images/index';
import { Divider } from 'react-native-paper';
import { useAppSelector } from '@/hooks/redux';
import auth from '@react-native-firebase/auth';
import { TopTabs } from '@/navigation/TopTabNavigation';
import { textStyles } from '@/theme/typography/textStyles';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';

export default function Profile() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useAppSelector(state => state.user.items);
  const posts = useAppSelector(state => state.posts.userPosts);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />

      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={[styles.image, styles.profilePicture]}
            source={Images.status}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View>
          <Text style={styles.countText}>{posts?.length}</Text>
          <Text style={styles.labelText}>Posts</Text>
        </View>

        <View>
          <Text style={styles.countText}>{user?.followers.length}</Text>
          <Text style={styles.labelText}>Followers</Text>
        </View>

        <View>
          <Text style={styles.countText}>{user?.following.length}</Text>
          <Text style={styles.labelText}>Following</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 4, marginBottom: 5 }}>
        <Text style={[{ color: 'black' }, textStyles.base, textStyles.medium]}>
          {user?.firstName}
        </Text>
        <Text style={textStyles.sm}>No bio</Text>
      </View>

      <CustomButton
        onPress={() => navigation.navigate('EditProfile')}
        variant="outline"
        title="Edit Profile"
      />
      <Divider />

      <View style={styles.bottomSection}>
        <TopTabs />
      </View>
    </SafeAreaView>
  );
}
