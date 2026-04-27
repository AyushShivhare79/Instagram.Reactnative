import 'react-native-url-polyfill/auto';
import 'react-native-url-polyfill/auto';
import Home from '@/screens/Home/HomeTab/Home';
import SearchTab from '@/screens/Home/Search/Search';
import Profile from '@/screens/Home/ProfileTab/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images } from '@/assets/images/index';
import { Icons } from '@/assets/Icons';
import { Avatar } from 'react-native-paper';
import MessagesList from '@/screens/Messages/MessagesList/MessagesList';
import Reels from '@/screens/Reels/Reels';

export type BottomTabParamList = {
  Home: undefined;
  Reels: undefined;
  MessageList: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeIcon = ({ focused }: { focused: boolean }) => <Icons.HouseIcon />;
const ReelsIcon = ({ focused }: { focused: boolean }) => <Icons.ReelsIcon />;
const MessageIcon = ({ focused }: { focused: boolean }) => <Icons.SendIcon />;
const SearchIcon = ({ focused }: { focused: boolean }) => <Icons.SearchIcon />;
const ProfileIcon = () => (
  <Avatar.Image size={24} source={Images.defaultProfile} />
);

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarActiveBackgroundColor: '#f0f0f0',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: HomeIcon,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ReelsIcon,
        }}
        name="Reels"
        component={Reels}
      />
      <Tab.Screen
        options={{
          tabBarIcon: MessageIcon,
        }}
        name="MessageList"
        component={MessagesList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: SearchIcon,
        }}
        name="Search"
        component={SearchTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ProfileIcon,
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
