import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendMessageNotification = functions.firestore
  .document('chats/{chatId}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    try {
      const message = snap.data();

      const receiverId = message.receiverId as string;
      const text = message.text as string;

      // 🔍 Get receiver FCM token
      const userDoc = await admin
        .firestore()
        .collection('users')
        .doc(receiverId)
        .get();

      const token = userDoc.data()?.fcmToken;

      if (!token) {
        console.log('No FCM token found');
        return;
      }

      // 📩 Send notification
      await admin.messaging().send({
        token,
        notification: {
          title: 'New Message',
          body: text,
        },
        data: {
          chatId: context.params.chatId,
          senderId: message.senderId,
        },
      });

      console.log('Notification sent');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  });
