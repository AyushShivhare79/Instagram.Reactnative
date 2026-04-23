import { Images } from '@/assets/images';
import { useAppSelector } from '@/hooks/redux';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ms } from '@/theme/responsive/responsive';
import { Chat } from '@/types/messageList';
import { styles } from './messageslist.styles';
import { Icons } from '@/assets/Icons';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { useNavigation } from '@react-navigation/native';

export default function MessagesList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [chats, setChats] = useState<Chat[]>([]);
  const userId = useAppSelector(state => state.user.items?.uid);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('chats')
      .where('participants', 'array-contains', userId)
      .orderBy('lastMessageAt', 'desc')
      .onSnapshot(
        async snapshot => {
          if (!snapshot) return;

          const response = await Promise.all(
            snapshot.docs.map(async doc => {
              const data = doc.data();

              const otherUserId = data.participants.find(
                (id: string) => id !== userId,
              );

              const userDoc = await firestore()
                .collection('users')
                .doc(otherUserId)
                .get();

              return {
                id: doc.id,
                ...data,
                otherUser: userDoc.data(),
              };
            }),
          );

          setChats(response);
        },
        error => {
          console.error('Chats listener error:', error);
        },
      );

    return () => unsubscribe();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Messages</Text>
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={chats}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Message', { user2: item.otherUser?.uid! })
              }
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <Avatar.Image
                size={ms(70)}
                source={
                  item.otherUser?.profilePicture
                    ? { uri: item.otherUser?.profilePicture }
                    : Images.defaultProfile
                }
              />

              <View>
                <Text style={styles.userName}>{item.otherUser?.name}</Text>
                <Text style={styles.message}>{item.lastMessage}</Text>
              </View>
              <Text>• {formatTimeAgo(item.lastMessageAt)}</Text>
            </TouchableOpacity>

            <Icons.CameraIcon />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const formatTimeAgo = timestamp => {
  if (!timestamp) return '';

  const now = new Date();
  const time = timestamp.toDate(); // 🔥 important
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;

  const years = Math.floor(days / 365);
  return `${years}y`;
};
