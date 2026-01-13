import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
        <Stack.Group>
          <Stack.Screen
            name="stories/index"
            options={{
              animationEnabled: true,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="stories/create"
            options={{
              animationEnabled: true,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="stories/viewer"
            options={{
              animationEnabled: true,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="stories/preview"
            options={{
              animationEnabled: true,
              gestureEnabled: false,
            }}
          />
        </Stack.Group>
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
