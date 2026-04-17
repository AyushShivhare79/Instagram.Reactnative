import { Icons } from '@/assets/Icons';
import 'react-native-url-polyfill/auto';
import 'react-native-url-polyfill/auto';
import Tagged from '@/screens/Home/ProfileTab/Tagged/Tagged';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Photos from '@/screens/Home/ProfileTab/Photos/Photos';

export type TopTabParamList = {
  Photos: undefined;
  Tags: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

const PhotosIcon = ({ focused }: { focused: boolean }) => <Icons.GridIcon />;
const TaggedIcon = ({ focused }: { focused: boolean }) => <Icons.UserIcon />;

export function TopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: 'black' },
        tabBarShowLabel: false,
      }}
    >
      <TopTab.Screen
        options={{
          tabBarIcon: PhotosIcon,
        }}
        name="Photos"
        component={Photos}
      />
      <TopTab.Screen
        options={{
          tabBarIcon: TaggedIcon,
        }}
        name="Tags"
        component={Tagged}
      />
    </TopTab.Navigator>
  );
}
