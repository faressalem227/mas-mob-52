import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Slot } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import GlobalProvider from '../context/GlobalProvider';
import Toast from 'react-native-toast-message';
import './global.css';

SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const [fontsLoaded, error] = useFonts({
    'Tajawal-Bold': require('../assets/fonts/Tajawal-Bold.ttf'),
    'Tajawal-Light': require('../assets/fonts/Tajawal-Light.ttf'),
    'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
    'Tajawal-Regular': require('../assets/fonts/Tajawal-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </GlobalProvider>

      {/* Toast always on top */}
      <Toast
        position="top"
        style={{
          zIndex: 999999,
          elevation: 999999, // Android layering
        }}
      />
    </SafeAreaProvider>
  );
};

export default RootStack;
