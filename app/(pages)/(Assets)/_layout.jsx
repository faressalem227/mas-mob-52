import { SplashScreen, Stack, useRouter, Slot } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const router = useRouter();
  const { user, isLogged } = useGlobalContext();

  useEffect(() => {
    if (!user || !isLogged) {
      router.replace("/");
    }
  }, [router, user, isLogged]);

  return (
    // <Stack>
    //   <Stack.Screen name="Locations" options={{ headerShown: false }} />
    //   <Stack.Screen name="LocationDetails" options={{ headerShown: false }} />
    //   <Stack.Screen name="AssetHome" options={{ headerShown: false }} />
    //   <Stack.Screen name="Assets" options={{ headerShown: false }} />
    //   <Stack.Screen name="AssetDetails" options={{ headerShown: false }} />
    //   <Stack.Screen name="AssetCounters" options={{ headerShown: false }} />
    //   <Stack.Screen name="AssetMaintenance" options={{ headerShown: false }} />
    //   <Stack.Screen name="AssetOrders" options={{ headerShown: false }} />
    //   <Stack.Screen name="FinancialAsset" options={{ headerShown: false }} />
    //   <Stack.Screen name="TechnicalAsset" options={{ headerShown: false }} />
    //   <Stack.Screen name="AssetsWorkOrder" options={{ headerShown: false }} />
    //   <Stack.Screen name="AssetCategories" options={{ headerShown: false }} />
    //   <Stack.Screen
    //     name="AssetCategoriesDetails"
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="TechnicalEvaluation"
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="TechnicalEvaluationDetails"
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen name="RiskEvaluation" options={{ headerShown: false }} />
    //   <Stack.Screen
    //     name="RiskEvaluationDetails"
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen name="ItemsDetails" options={{ headerShown: false }} />
    //   <Stack.Screen
    //     name="(AssetsSettingsHome)"
    //     options={{ headerShown: false }}
    //   />
      <Slot />
    // </Stack>
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
