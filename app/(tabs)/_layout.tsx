 import { Tabs } from 'expo-router';
  import React from 'react';
  import { Platform } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';

  export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#2e7d32',
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size || 24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size || 24} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }