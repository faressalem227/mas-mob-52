import { useEffect } from 'react';
import { SplashScreen, useRouter, Slot } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();

const ProtectedRoute = () => {
  const router = useRouter();
  const { user, isLogged } = useGlobalContext();

  useEffect(() => {
    if (!user || !isLogged) {
      router.replace('/');
    }
  }, [user, isLogged]);

  useEffect(() => {
    // Only initialize notifications when user is logged in
    if (!isLogged) return;

    // Safe dynamic imports — prevent crashes on Expo Go
    const setupNotifications = async () => {
      try {
        const messaging = (await import('@react-native-firebase/messaging')).default;
        const notifeeModule = await import('@notifee/react-native');
        const notifee = notifeeModule.default;
        const { AndroidImportance, EventType } = notifeeModule;

        // Foreground messages
        const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
          console.log('Foreground message:', remoteMessage);

          const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
          });

          await notifee.displayNotification({
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            android: {
              channelId,
              pressAction: { id: 'default' },
            },
          });
        });

        // Background handler (only needed once globally, but safe here)
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('Background message:', remoteMessage);
        });

        // Handle when app opened by tapping a notification
        messaging()
          .getInitialNotification()
          .then((remoteMessage) => {
            if (remoteMessage) {
              router.push('/');
            }
          });

        // Handle Notifee press events
        const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
          if (type === EventType.PRESS) {
            router.push('/');
          }
        });

        // Cleanup
        return () => {
          unsubscribeForeground();
          unsubscribeNotifee();
        };
      } catch (error) {
        console.log('Notification setup skipped (Expo Go or missing module):', error);
      }
    };

    setupNotifications();
  }, [isLogged]);

  return <Slot />;
};

export default ProtectedRoute;

// import "@react-native-firebase/app";
// import messaging from "@react-native-firebase/messaging";
// import notifee, { AndroidImportance } from "@notifee/react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
//load the font to the app
// useEffect(() => {
// 	const unsubscribeForeground = messaging().onMessage(
// 		async (remoteMessage) => {
// 			// Display a custom notification using Notifee
// 			const channelId = await notifee.createChannel({
// 				id: "default",
// 				name: "Default Channel",
// 				android: {
// 					importance: AndroidImportance.HIGH,
// 				},
// 			});

// 			await notifee.displayNotification({
// 				title: remoteMessage.notification?.title,
// 				body: remoteMessage.notification?.body,
// 				android: {
// 					channelId: channelId,
// 				},
// 			});
// 		}
// 	);

// 	return unsubscribeForeground;
// }, []);

// useEffect(() => {
// 	messaging().setBackgroundMessageHandler(async (remoteMessage) => {
// 		//console.log("Message handled in the background!", remoteMessage);

// 		// Handle navigation based on notification data
// 		const { type, ...data } = remoteMessage.data;
// 		if (type === "specificType") {
// 			navigation.navigate("TargetScreen", { data });
// 		}
// 	});

// 	messaging()
// 		.getInitialNotification()
// 		.then((remoteMessage) => {
// 			if (remoteMessage) {
// 				//console.log(
// 					"Notification caused app to open from quit state:",
// 					remoteMessage
// 				);

// 				// Handle deep linking based on the message content
// 				const { type, ...data } = remoteMessage.data;
// 				if (type === "specificType") {
// 					navigation.navigate("TargetScreen", { data });
// 				}
// 			}
// 		});
// }, [navigation]);
