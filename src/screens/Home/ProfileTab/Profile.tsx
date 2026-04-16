import { FlatList, Text, View } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grid3x2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { useAppSelector } from '../../../hooks/redux';
import firestore from '@react-native-firebase/firestore';
import FastImage from '@d11/react-native-fast-image';
import { Icons } from '../../../assets/Icons/index';
import { Images } from '../../../assets/images/index';
import { Divider } from 'react-native-paper';
import { TopTabs } from '../../../App';

export default function Profile() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={[styles.image, styles.profilePicture]}
            source={Images.status}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

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

      <View>
        <Text>{}</Text>
        <Text>Bio</Text>
      </View>

      <CustomButton title="Edit Profile" />

      <Divider />

      <View style={{ flex: 1 }}>
        <TopTabs />
      </View>

      {/* <View>
        <Grid3x2 />
        <Icons.UserIcon />
      </View> */}
    </SafeAreaView>
  );
}
