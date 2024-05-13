/*import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  // TODO: 사용자 정보와 함수는 실제 데이터와 로직에 따라 연동해야 합니다.

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../assets/logo.png')} // 실제 프로필 이미지 경로로 바꿔야 함
          style={styles.profileImage}
        />
        <View style={styles.profileTitle}>
          <Text style={styles.userName}>닉네임</Text>
        </View>
      </View>
      <View style={styles.infoBox}>
        <TextInput style={styles.bioInput} placeholder="상태메세지" />
      </View>
      <View style={styles.copyRightBox}>
        <TextInput
          style={styles.copyRightInput}
          defaultValue="fsd2fe12dasfsdadsasd"
        />
        <TouchableOpacity>
          <Icon name="content-copy" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  infoBox: {
    padding: 16,
  },
  bioInput: {
    borderWidth: 3,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  copyRightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  copyRightInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
  },
  // 다른 스타일 요소를 여기에 추가합니다.
});

export default ProfileScreen;*/
import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {
  // 함수 구현 필요
  const handleMyInfo = () => {
    // 내정보 화면으로 이동
    navigation.navigate('MyInfoScreen');
  };

  const handleSettings = () => {
    // 환경설정 화면으로 이동
    navigation.navigate('SettingsScreen');
  };

  const handleVulnerableCertification = () => {
    // 취약계층 인증 화면으로 이동
    navigation.navigate('VulnerableCertificationScreen');
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileTitle}>
          <Text style={styles.userName}>닉네임</Text>
        </View>
      </View>
      <View style={styles.infoBox}>
        <TextInput 
          style={[styles.bioInput, {height: 80}]} // 높이 조정
          placeholder="상태메세지"
          multiline
          numberOfLines={3} // 세로로 세 줄의 높이
        />
      </View>
      {/* 메뉴 영역 */}
      <TouchableOpacity style={styles.menuItem} onPress={handleMyInfo}>
        <Text style={styles.menuText}>내정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
        <Text style={styles.menuText}>환경설정</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleVulnerableCertification}>
        <Text style={styles.menuText}>취약계층인증</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    padding: 16,
  },
  bioInput: {
    borderWidth: 3,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 16,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // 추가적인 스타일 요소를 여기에 정의할 수 있습니다.
});

export default ProfileScreen;
