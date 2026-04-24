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

      <CustomButton
        onPress={() => navigation.navigate('EditProfile')}
        variant="outline"
        title="Edit Profile"
      />
    </>
  );
}
