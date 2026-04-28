import firestore from '@react-native-firebase/firestore';

export const serializeTimestamps = (data: any) => {
  const result: any = {};

  for (const key in data) {
    const value = data[key];

    result[key] =
      value && typeof value.toDate === 'function'
        ? value.toDate().toISOString()
        : value;
  }

  return result;
};

export const fetchPostsWithUsers = async () => {
  try {
    const postSnapshot = await firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get();

    const posts = postSnapshot.docs.map(doc => ({
      id: doc.id,
      ...serializeTimestamps(doc.data()),
    }));

    const userIds = [...new Set(posts.map(p => p.userId).filter(Boolean))];

    if (userIds.length === 0) return posts;

    const userDocs = await Promise.all(
      userIds.map(id => firestore().collection('users').doc(id).get()),
    );

    const userMap: Record<string, any> = {};

    userDocs.forEach(doc => {
      if (doc.exists()) {
        userMap[doc.id] = {
          id: doc.id,
          ...serializeTimestamps(doc.data()),
        };
      }
    });

    const merged = posts.map(post => ({
      ...post,
      user: userMap[post.userId] || null,
    }));

    return merged;
  } catch (error) {
    console.error('fetchPostsWithUsers Error:', error);
    return [];
  }
};
