import { Stack } from 'expo-router';
import React from 'react';
import {  Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { HeaderStyle as style } from './style/Styles';


export default function Layout() {
  const router = useRouter();

  return (
      <Stack
      screenOptions={{
        headerTitle: () => (
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
              Restaurant Guide
            </Text>
          </TouchableOpacity>
        ), 
        headerTitleStyle: style.title, 
        headerTintColor: "#333", 
        headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/pages/About")} style={style.menuButton}>
          <Text style={style.menuText}>About</Text>
        </TouchableOpacity>
        )
      }}
    />
    
  );
}

