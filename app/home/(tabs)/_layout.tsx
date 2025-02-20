import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff', // Set the inactive color here
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
              backgroundColor: '#051B2C', // Add border color
              borderTopLeftRadius: 18, // Add border radius
              borderTopRightRadius: 18, // Add border radius
            },
            default: {
              backgroundColor: '#051B2C', // Set the background color to black // Add border color
              borderTopLeftRadius: 18, // Add border radius
              borderTopRightRadius: 18, // Add border radius
            },
          }),
          
          //tabBarInactiveStyle: 
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarActiveTintColor: '#0BDBC7',
            //tabBarLabelStyle: '#0BDBC7',
            tabBarIcon: ({ color }) => <Icon name="fire" size={18} color={color} />,
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: 'Post',
            tabBarActiveTintColor: '#0BDBC7',
            tabBarIcon: ({ color }) => <Icon name="newspaper" size={18} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarActiveTintColor: '#0BDBC7',
            tabBarIcon: ({ color }) => <Icon name="compass" size={20} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff', // Set the background color of the main layout
  },
});