import { FlatList } from 'react-native';
import { Images } from '../../assets/images/index';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState(Array(5).fill({}));

  return (
    <SafeAreaView style={{ flexDirection: 'row' }}>
      <FlatList
        contentContainerStyle={{ flexDirection: 'row', gap: 10 }}
        data={status}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item: _item }) => (
          <Avatar.Image size={70} source={Images.status} />
        )}
      />
    </SafeAreaView>
  );
}
