import { Stack } from 'expo-router';
  import { StatusBar } from 'expo-status-bar';
  import 'react-native-reanimated';
  import { CartProvider } from '@/contexts/CartContext';

  export const unstable_settings = {
    anchor: '(tabs)',
  };

export default function RootLayout() {
    return (
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </CartProvider>
    );
  }