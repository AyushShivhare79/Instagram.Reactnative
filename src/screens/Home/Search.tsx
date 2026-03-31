import { TextInput } from 'react-native-paper';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';

export default function SearchTab() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async (searchText: string) => {
    if (searchText === '') {
      setUsers([]);
      return;
    }
    try {
      const querySnapshot = await firestore().collection('users').get();
      console.log('Query: ', querySnapshot);

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
    fetchUsers(text);
  };

  return (
    <SafeAreaView>
      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        left={
          <TextInput.Icon
            icon={({ size, color }) => <SearchIcon size={size} color={color} />}
          />
        }
        placeholder="Search for users..."
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <Text>{item.}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
