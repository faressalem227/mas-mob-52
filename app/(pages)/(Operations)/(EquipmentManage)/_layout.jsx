import { useEffect } from "react";
import { SplashScreen, Stack, useRouter, Slot } from "expo-router";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { LogoBar, MainLayout } from "../../../../components";
import { SafeAreaView } from "react-native";
SplashScreen.preventAutoHideAsync();

const ProtectedRoute = () => {
	const router = useRouter();
	const { user, isLogged } = useGlobalContext();

	useEffect(() => {
		if (!user || !isLogged) {
			router.replace("/");
		}
	}, [user, isLogged]);

	return (
		<>
				<Slot />
		</>
	);
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
