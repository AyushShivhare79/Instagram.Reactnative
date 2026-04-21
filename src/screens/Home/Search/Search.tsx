import { Avatar, TextInput } from 'react-native-paper';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from './search.styles';
import { Images } from '@/assets/images';
import { useAppSelector } from '@/hooks/redux';
import { textStyles } from '@/theme/typography/textStyles';
import { FONT_SIZE } from '@/theme/typography/fontSizes';
import { COLORS } from '@/theme/color/color';

export default function SearchTab() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  const user = useAppSelector(state => state.user.items);

  const fetchUsers = async (searchText: string) => {
    if (!searchText.trim()) {
      setUsers([]);
      return;
    }

    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('username', '>=', searchText)
        .where('username', '<=', searchText + '\uf8ff')
        .limit(10)
        .get();

      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(search);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Search for users..."
        left={
          <TextInput.Icon
            icon={({ size, color }) => <SearchIcon size={size} color={color} />}
          />
        }
      />

      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={users}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No users found</Text>}
        renderItem={({ item }) => {
          const isMe = user?.uid === item.userId;

          return (
            <View style={styles.searchArea}>
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Avatar.Image
                  size={50}
                  source={
                    item?.user?.profilePicture
                      ? { uri: item.user.profilePicture }
                      : isMe && user?.profilePicture
                      ? { uri: user.profilePicture }
                      : Images.defaultProfile
                  }
                />
              </View>

              <View
                style={{
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: FONT_SIZE.sm }}>{item.username}</Text>
                <Text
                  style={{
                    fontSize: FONT_SIZE.sm,
                    color: COLORS.textSecondary,
                  }}
                >
                  {item.firstName}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
