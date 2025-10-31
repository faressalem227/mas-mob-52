import messaging from '@react-native-firebase/messaging';

export const buildTree = (data, parentId = null, parentKeyName, keyName) => {
  return data
    .filter((item) => item[parentKeyName] === parentId)

    .map((item) => ({
      ...item,
      children: buildTree(data, item[keyName], parentKeyName, keyName),
    }));
};

export const getFCMToken = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.log('Notification permission not granted');
    return null;
  }

  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};
