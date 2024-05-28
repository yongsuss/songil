// 프로필 화면

/*import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  const { apiUrl } = useContext(AppContext);
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    message: ''
  });

  const handleLogout = () => {
    // 사용자 로그아웃 처리
    setIsLoggedIn(false);  // 로그인 상태를 false로 설정

    // 모든 스택을 리셋하고 로그인 화면으로 이동
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const url = `${apiUrl}/users/`; // Simplified URL assuming 'users' endpoint lists users
        const response = await axios.get(url);
        if (response.data && response.data.length > 0 ) {
          const userData = response.data[0];
          setUserInfo({
            nickname: userData.nickname,
            message: userData.message
          });
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        console.error('Request made to:', url);
        if (error.response) {
          console.error('Error status:', error.response.status);
          console.error('Error data:', error.response.data);
        } else if (error.request) {
          console.error('No response received');
        } else {
          console.error('Error message:', error.message);
        }
      }
    };
  
    fetchUserInfo();
  }, [apiUrl]);
  

  const handleChoosePhoto = () => {
    const options = { mediaType: 'photo', quality: 1, includeBase64: false };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source.uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/logo.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileTitle}>
          <TextInput
            style={styles.userName}
            value={userInfo.nickname}
            onChangeText={(text) => setUserInfo({ ...userInfo, nickname: text })}
            placeholder="닉네임"
          />
        </View>
      </View>
      <View style={styles.infoBox}>
        <TextInput
          style={[styles.bioInput, { height: 80 }]}
          value={userInfo.message}
          onChangeText={(text) => setUserInfo({ ...userInfo, message: text })}
          placeholder="상태메세지"
          multiline
          numberOfLines={3}
        />
      </View>
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
});

export default ProfileScreen;*/



import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  const { apiUrl, id } = useContext(AppContext); // AppContext에서 userId를 가져옴
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    message: ''
  });



  const handleLogout = () => {
    // 사용자 로그아웃 처리
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const handleMyInfo = () => {
    navigation.navigate('MyInfoScreen');
  };

  const handleSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const handleVulnerableCertification = () => {
    navigation.navigate('VulnerableCertificationScreen');
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!id) {
        console.log('No user ID available');
        return;
      }
      try {
        const url = `${apiUrl}/users/${id}`; // ID를 이용하여 특정 유저의 정보 요청
        const response = await axios.get(url);
        if (response.data) {
          setUserInfo({
            nickname: response.data.nickname,
            message: response.data.message
          });
          if (response.data.profileImage) {
            setProfileImage(response.data.profileImage);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, [apiUrl, id]);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("We need permission to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/logo.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileTitle}>
          <TextInput
            style={styles.userName}
            value={userInfo.nickname}
            onChangeText={(text) => setUserInfo({ ...userInfo, nickname: text })}
            placeholder="닉네임"
          />
        </View>
      </View>
      <View style={styles.infoBox}>
        <TextInput
          style={[styles.bioInput, { height: 80 }]}
          value={userInfo.message}
          onChangeText={(text) => setUserInfo({ ...userInfo, message: text })}
          placeholder="상태메세지"
          multiline
          numberOfLines={3}
        />
      </View>
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
});

export default ProfileScreen;



