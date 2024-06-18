import "react-native-gesture-handler";
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Navigation from "./Navigation";
import {AppProvider} from './AppContext';
import Home from "./screens/Home";
import * as Notifications from 'expo-notifications';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  async function registerForPushNotificationsAsync() {//알림 초기 설정
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('알림 권한이 필요합니다!');
      return;
    }
  }

  return(
    <AppProvider>
       <Navigation>
         <Home />
       </Navigation>
    </AppProvider>
  );
}