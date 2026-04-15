import { FlatList, Text, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grid3x2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { useAppSelector } from '@/hooks/redux';
import firestore from '@react-native-firebase/firestore';

export default function Profile() {
  const [posts, setPosts] = useState([{}]);

  const user = useAppSelector(state => state.user.items);

  const fetchPost = async () => {
    const postSnapshot = await firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .doc(user?.uid)
      .get();
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView>
      <View style={styles.topContainer}>
        <Text>Image</Text>

        <View>
          <Text>10</Text>
          <Text>Posts</Text>
        </View>

        <View>
          <Text>832</Text>
          <Text>Followers</Text>
        </View>

        <View>
          <Text>100</Text>
          <Text>Following</Text>
        </View>
      </View>

      <CustomButton title="Edit Profile" />
      <View>
        <Text>{}</Text>
        <Text>Bio</Text>
      </View>

      <View>
        <Grid3x2 />
      </View>

      <FlatList />
    </SafeAreaView>
  );
}
