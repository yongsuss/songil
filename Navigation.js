import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState, Component, useContext  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import Home from './screens/Home'; // 홈화면
import NewsDetail from './screens/NewsDetail'; 
import Profile from './screens/Profile';  //프로필화면
import Rank from './screens/Rank';    //랭크화면
import FundBoard from './screens/FundBoard';  //기부게시글화면
import Bulletin from './screens/Bulletin';    //기부글 화면
import FundBoardMake from './screens/FundBoardMake';
import AllFund from './screens/AllFund'; //모금화면
import AllFundMake from './screens/AllFundMake';
import LoginScreen from './screens/LoginScreen'; //로그인화면
import SignUpScreen from './screens/SignUpScreen'; //회원가입화면
import SearchPasswordScreen from './screens/SearchPasswordScreen'; //비밀번호찾기화면
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Icon 추가
import RegionScreen from './screens/RegionScreen'; //기부게시글-지역선택
import MyInfoScreen from './screens/MyInfoScreen'; //프로필-내정보
import SettingsScreen from './screens/SettingsScreen'; //프로필-환경설정
import DeliveryScreen from './screens/DeliveryScreen'; //게시글에서 기부하기 버튼누르면 들어가는 화면 
import VulnerableCertificationScreen from './screens/VulnerableCertificationScreen' //프로필-취약계층인증
//import DeliveryScreen from './screens/DeliveryScreen'; //배송
import { AppContext } from './AppContext'; // AppContext 가져오기
import FundraisingBulletin from './screens/FundraisingBulletin'; //모금 게시글 화면
import HomeBulletin from './screens/HomeBulletin';  //홈화면에서 보는 게시글
import MyPosts from './screens/MyPosts';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 추가


async function fetchWeakUsers() {
  try {
    const response = await fetch('http://20.39.190.194/weakusers/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      const users = await response.json();
      return users;  // 약자 사용자 목록을 반환합니다.
    }
    throw new Error('Failed to fetch weak users');
  } catch (error) {
    console.error('Error fetching weak users:', error);
    return [];  // 오류 발생 시 빈 배열 반환
  }
}


//터치가능한 버튼 생성을 위한 함수
function HeaderButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerButton}>
      <Text style={styles.headerButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

//적절한 버튼 스타일 
const styles = StyleSheet.create({
  headerButton: {
    padding: 10  // 적절한 패딩 제공
  },
  headerButtonText: {
    color: '#000000',  // iOS 기본 링크 색상
    fontSize: 16       // 텍스트 크기
  }
});
//로그인,회원가입,비번찾기 네비게이션
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

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
      options={({ navigation }) => ({
        headerTitle: '홈',
        headerTitleAlign: 'center',
      })}
      />
      <Stack.Screen name="NewsDetail" component={NewsDetail} 
      options={({ navigation }) => ({
        headerTitle: '뉴스',
        headerTitleAlign: 'center',
      })}
      />
      <Stack.Screen
        name="HomeBulletin" 
        component={HomeBulletin}
        options={{ headerTitle: '게시글', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

function AllFundStack() {
  const { id } = useContext(AppContext);  // AppContext에서 id를 가져옵니다.

  const handleNavigate = async (navigation) => {
    const weakUsers = await fetchWeakUsers();
    const isWeakUser = weakUsers.some(user => user.id === id); // 가져온 id를 사용
    if (isWeakUser) {
      navigation.navigate('AllFundMake');
    } else {
      alert('모금건의는 취약계층사용자만 사용가능합니다.');
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllFund" component={AllFund}
        options={({ navigation }) => ({
          headerTitle: '모금',
          headerTitleAlign: 'center',
          headerRight: () => (
            <HeaderButton onPress={() => handleNavigate(navigation)} title="모금건의하기" />
          ),
        })}
      />
      <Stack.Screen
        name="AllFundMake" component={AllFundMake}
        options={{ headerTitle: '모금건의하기', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="FundraisingBulletin" 
        component={FundraisingBulletin}
        options={{ headerTitle: '모금 게시글', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

function FundBoardStack() {
  const { id } = useContext(AppContext);  // AppContext에서 id를 가져옵니다.

  return (
    <Stack.Navigator initialRouteName="RegionScreen">
      <Stack.Screen
        name="RegionScreen" 
        component={RegionScreen}
        options={{ headerTitle: '지역 선택', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="FundBoard" 
        component={FundBoard}
        options={({ navigation }) => ({
          headerTitle: '기부게시글',
          headerTitleAlign: 'center',
          headerRight: () => (
            <HeaderButton onPress={async () => {
              const weakUsers = await fetchWeakUsers();
              const isWeakUser = weakUsers.some(user => user.id === id);
              if (isWeakUser) {
                navigation.navigate('FundBoardMake');
              } else {
                alert('게시글 작성은 취약계층사용자만 사용가능합니다.');
              }
            }} title="게시글 작성" />
          ),
        })}
      />
      <Stack.Screen
        name="FundBoardMake" 
        component={FundBoardMake}
        options={{ headerTitle: '게시글 작성', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Bulletin" 
        component={Bulletin}
        options={{ headerTitle: '게시글', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="DeliveryScreen" 
        component={DeliveryScreen}
        options={{ headerTitle: '배송 화면', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}


function ProfileStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="프로필 " options={{headerTitleAlign: 'center'}}>
        {props => <Profile {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="MyInfoScreen" component={MyInfoScreen}
        options={{ headerTitle: '내정보', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SettingsScreen" component={SettingsScreen}
        options={{ headerTitle: '환경설정', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="VulnerableCertificationScreen" component={VulnerableCertificationScreen}
        options={{ headerTitle: '취약계층인증', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="MyPosts" component={MyPosts}
        options={{ headerTitle: '나의 게시글', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

function TabGroup({ setIsLoggedIn }) {
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
                   
                  return <MaterialCommunityIcons name={iconName} size={size} color={color} style={{ backgroundColor: 'red' }}/>;
              },
              tabBarLabelPosition: 'below-icon', // 아이콘 아래에 라벨 표시
              tabBarActiveTintColor: 'tomato', // 활성 탭의 색상
              tabBarInactiveTintColor: 'gray', // 비활성 탭의 색상
          })}
      >
          
          <Tab.Screen
          name="홈" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="기부게시판" component={FundBoardStack} options={{ headerShown: false }}/>
          <Tab.Screen name="모금" component={AllFundStack} options={{ headerShown: false }}
          />
          <Tab.Screen name="랭킹" component={Rank} options={{ headerTitle: '랭킹', headerTitleAlign: 'center' }} />
          <Tab.Screen
            name="프로필"
            options={{
              headerShown: false
            }}>
            {() => <ProfileStack setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
      </Tab.Navigator>
  );
}



export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TabGroup setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}