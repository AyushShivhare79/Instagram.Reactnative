import { Text, View } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '@/assets/images/index';
import { Divider } from 'react-native-paper';
import { useAppSelector } from '@/hooks/redux';
import auth from '@react-native-firebase/auth';
import { TopTabs } from '@/navigation/TopTabNavigation';
import Toast from 'react-native-toast-message';

export default function Profile() {
  const user = useAppSelector(state => state.user.items);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={[styles.image, styles.profilePicture]}
            source={Images.status}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View>
          <Text style={styles.countText}></Text>
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

      <View>
        <Text style={{ color: 'black', fontWeight: '700' }}>
          {user?.firstName}
        </Text>
        <Text>No bio</Text>
      </View>

      <CustomButton variant="outline" title="Edit Profile" />
      <Divider />

      <View style={styles.bottomSection}>
        <TopTabs />
      </View>
    </SafeAreaView>
  );
}
