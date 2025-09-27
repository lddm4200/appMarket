import SafeScreen from "@/components/SafeScreen";
import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="ProductDatail" />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", sheetAllowedDetents: [0.3, 1] }}
            />
          </Stack>
        </SafeScreen>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
