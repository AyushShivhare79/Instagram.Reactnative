import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore, {
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from '@react-native-firebase/firestore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/StackNavigation';
import { useAppSelector } from '@/hooks/redux';
import { db } from '@/lib/firebase';

export default function Messages() {
  const route = useRoute<RouteProp<RootStackParamList, 'Message'>>();
  const user = useAppSelector(state => state.user.items);

  const user2 = route.params?.user2;
  const user1 = user?.uid!;

  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!user2) return;
    const id = user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
    setChatId(id);

    const readMessage = async () => {
      await updateDoc(doc(db, 'chats', chatId!), {
        [`unreadCounts.${user1}`]: 0,
      });
    };

    readMessage();
  }, [user1, user2, chatId]);

  useEffect(() => {
    if (!chatId) return;

    const chatRef = firestore().collection('chats').doc(chatId);

    chatRef.set(
      {
        participants: [user1, user2],
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    const unsubscribe = chatRef
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(msgs);
      });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim() || !chatId) return;

    const chatRef = doc(db, 'chats', chatId);
    const messagesRef = collection(chatRef, 'messages');

    const batch = writeBatch(db);

    const newMessageRef = doc(messagesRef);

    batch.set(newMessageRef, {
      text,
      senderId: user1,
      createdAt: serverTimestamp(),
    });

    batch.set(
      chatRef,
      {
        lastMessage: text,
        lastMessageAt: serverTimestamp(),
        lastMessageSenderId: user1,
        unreadCounts: {
          [user1]: 0,
          [user2]: increment(1),
        },
      },
      { merge: true },
    );

    await batch.commit();

    setText('');
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: any) => {
    const isMe = item.senderId === user1;

    return (
      <View
        style={{
          alignSelf: isMe ? 'flex-end' : 'flex-start',
          marginVertical: 6,
          marginHorizontal: 10,
          maxWidth: '75%',
        }}
      >
        <View
          style={{
            backgroundColor: isMe ? '#007AFF' : '#ECECEC',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 18,
            borderBottomRightRadius: isMe ? 4 : 18,
            borderBottomLeftRadius: isMe ? 18 : 4,
          }}
        >
          <Text style={{ color: isMe ? '#fff' : '#000', fontSize: 15 }}>
            {item.text}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 10,
            color: '#888',
            marginTop: 2,
            alignSelf: isMe ? 'flex-end' : 'flex-start',
          }}
        >
          {formatTime(item.createdAt)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          inverted
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        {/* Input Bar */}
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderTopWidth: 1,
            borderColor: '#eee',
            backgroundColor: '#fff',
          }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Message..."
            placeholderTextColor="#999"
            style={{
              flex: 1,
              backgroundColor: '#F2F2F2',
              borderRadius: 25,
              paddingHorizontal: 15,
              paddingVertical: 10,
              fontSize: 15,
            }}
          />

          <TouchableOpacity
            onPress={sendMessage}
            style={{
              marginLeft: 8,
              backgroundColor: '#007AFF',
              borderRadius: 25,
              paddingHorizontal: 16,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
