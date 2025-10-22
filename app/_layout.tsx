import SafeScreen from "@/components/SafeScreen";
import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const queryClient = new QueryClient();
export default function RootLayout() {
  const { checkAuth, user, token }: any = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>

            <Stack.Protected guard={!!token}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="ProductDatail" />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  sheetAllowedDetents: [0.3, 1],
                }}
              />
            </Stack.Protected>

            <Stack.Protected guard={!token}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>

          </Stack>
        </SafeScreen>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
