import { SplashScreen, Stack, useRouter, Slot } from "expo-router";
import { useGlobalContext } from "../../../../context/GlobalProvider";
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
    
      <Slot />
  );
};

export default ProtectedRoute;
