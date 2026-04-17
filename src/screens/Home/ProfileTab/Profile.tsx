import firestore from '@react-native-firebase/firestore';
import { Text, View } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import FastImage from '@d11/react-native-fast-image';
import { Images } from '@/assets/images/index';
import { Divider } from 'react-native-paper';
import { TopTabs } from '@/App';
import { useAppSelector } from '@/hooks/redux';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState();
  const userId = useAppSelector(state => state.user.items?.uid);

  const fetchUser = async () => {
    const response = await firestore().collection('users').doc(userId).get();

    setUser(response._data);
  };
  console.log('User: ', user);

  useEffect(() => {
    fetchUser();
  }, []);

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
          <Text style={styles.countText}>10</Text>
          <Text style={styles.labelText}>Posts</Text>
        </View>

        <View>
          <Text style={styles.countText}>832</Text>
          <Text style={styles.labelText}>Followers</Text>
        </View>

        <View>
          <Text style={styles.countText}>100</Text>
          <Text style={styles.labelText}>Following</Text>
        </View>
      </View>

      <View>
        <Text style={{ color: 'black', fontWeight: '700' }}>{user?.name}</Text>
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
