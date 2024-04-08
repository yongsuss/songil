/*
// Navigation.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // 추가
import Feed from './screens/Feed';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'; // 추가
import SearchPasswordScreen from './screens/SearchPasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 추가

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SearchPassword" component={SearchPasswordScreen} />
    </Stack.Navigator>
  );
}


function TabGroup() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="홈" component={Feed} />
            <Tab.Screen name="기부게시판" component={Feed} />
            <Tab.Screen name="모금" component={Feed} />
            <Tab.Screen name="랭킹" component={Feed} />
            <Tab.Screen name="프로필" component={Feed} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabGroup /> : <AuthStack />}
    </NavigationContainer>
  );
}*/


// Navigation.js
import React, { useState,Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // 추가
import Feed from './screens/Feed';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Rank from './screens/Rank';
import FundBoard from './screens/FundBoard';
import AllFund from './screens/AllFund';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'; // 추가
import SearchPasswordScreen from './screens/SearchPasswordScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Icon 추가



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 추가


function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onLoginSuccess={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SearchPassword" component={SearchPasswordScreen} />
    </Stack.Navigator>
  );
}



/*function TabGroup() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="홈" component={Feed} />
            <Tab.Screen name="기부게시판" component={Feed} />
            <Tab.Screen name="모금" component={Feed} />
            <Tab.Screen name="랭킹" component={Feed} />
            <Tab.Screen name="프로필" component={Feed} />
        </Tab.Navigator>
    );
}*/
function TabGroup() {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === '홈') {
                      iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === '기부게시판') {
                      iconName = focused ? 'heart' : 'heart-outline';
                  } else if (route.name === '모금') {
                    iconName = focused ? 'hand-heart' : 'hand-heart-outline';
                  } else if (route.name === '랭킹') {
                    iconName = focused ? 'trophy' : 'trophy-outline';
                  } else if (route.name === '프로필') {
                    iconName = focused ? 'account-circle' : 'account-circle-outline';
                  } 
                   // 다른 탭에 대한 iconName 설정을 계속 추가...
                  // 아이콘 크기와 색상을 조정할 수 있습니다.
                  return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarLabelPosition: 'below-icon', // 아이콘 아래에 라벨 표시
              tabBarActiveTintColor: 'tomato', // 활성 탭의 색상
              tabBarInactiveTintColor: 'gray', // 비활성 탭의 색상
          })}
      >
          <Tab.Screen name="홈" component={Home} />
          <Tab.Screen name="기부게시판" component={FundBoard} />
          <Tab.Screen name="모금" component={AllFund} />
          <Tab.Screen name="랭킹" component={Rank} />
          <Tab.Screen name="프로필" component={Profile} />
      </Tab.Navigator>
  );
}


export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TabGroup />
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} /> // setIsLoggedIn을 AuthStack에 prop으로 전달
      )}
    </NavigationContainer>
  );
}
  