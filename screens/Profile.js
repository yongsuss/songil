//프로필 화면
/*import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import axios from 'axios';

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  const {
    id, // 사용자 ID를 AppContext에서 추가로 가져와야 합니다.
    nickname,
    message,
    point,
    rank,
    setNickname,
    setMessage,
    profileimage,
    setProfileimage,
    profileToken,
    apiUrl,
    azureUrl
  } = useContext(AppContext);

  useEffect(() => {
    
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  
  const userspost= () => {
    navigation.navigate('MyPosts'); //유저가 작성한 게시글의 목록
  };

  const mydonation= () => {
    navigation.navigate('MyDonation'); //유저가 작성한 게시글의 목록
  };

  const handleMyInfo = () => {
    navigation.navigate('MyInfoScreen');
  };


  const handleVulnerableCertification = () => {
    navigation.navigate('VulnerableCertificationScreen');
  };

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();//파일 접근 권한
    if (permissionResult.granted === false) {
      alert("We need permission to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;
      const fileName = fileUri.split('/').pop();

      try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        const fileArrayBuffer = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
        await axios.put(`${azureUrl}/profile/${fileName}?${profileToken}`, fileArrayBuffer, {
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': 'image/jpeg'
          }
        });
        
        await axios.patch(`${apiUrl}/user/update/image`, {
          id: id,
          new_image: fileName
        });
        setProfileimage(fileName);
        alert("변경");
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={profileimage ? { uri: azureUrl+"/profile/"+profileimage } : require('../assets/logo.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileTitle}>
          <Text style={styles.userName}>{nickname}</Text>
          <View style={{width: "100%", flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={[styles.userRank, {color: '#00ff33'}]}>{`Rank `}</Text>
            <Text style={[styles.userRank, {color: '#3333ff'}]}>{`Lv.${rank}`}</Text>
          </View>
          <View style={{width: "100%", height: 5,flexDirection: 'row', justifyContent: 'center', marginTop: 8}}>
            <Progress.Bar progress={0.3} width={200} height={5}/>
          </View>
        </View>
      </View>
      <View style={styles.infoBox}>
        <TextInput
          style={[styles.bioInput, { height: 80 }]}
          value={message}
          onChangeText={setMessage}
          placeholder="상태메세지"
          multiline
          numberOfLines={3}
        />
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={handleMyInfo}>
        <Text style={styles.menuText}>내정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={userspost}>
        <Text style={styles.menuText}>나의 게시글</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={mydonation}>
        <Text style={styles.menuText}>기부기록</Text>
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
    justifyContent: 'flex-start'
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileTitle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 25
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  userRank: {
    fontSize: 15,
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
    fontSize: 18,
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
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../AppContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';
import axios from 'axios';

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  const {
    id, // 사용자 ID를 AppContext에서 추가로 가져와야 합니다.
    nickname,
    message,
    point,
    rank,
    setNickname,
    setMessage,
    profileimage,
    setProfileimage,
    profileToken,
    apiUrl,
    azureUrl
  } = useContext(AppContext);

  const [totalAmount, setTotalAmount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchDonationTotal = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user_donation_totals/`);
        const userData = response.data.find(user => user.nickname === nickname);
        if (userData) {
          setTotalAmount(userData.total_amount);
          updateRankAndProgress(userData.total_amount);
        }
      } catch (error) {
        console.error('Error fetching user donation totals:', error);
      }
    };

    fetchDonationTotal();
  }, [nickname]);

  const updateRankAndProgress = (amount) => {
    const thresholds = [10000, 50000, 100000, 500000, 1000000];
    const nextThreshold = thresholds.find(threshold => amount < threshold);
    const currentLevelIndex = thresholds.indexOf(nextThreshold);
    const previousThreshold = currentLevelIndex > 0 ? thresholds[currentLevelIndex - 1] : 0;
    const progress = (amount - previousThreshold) / (nextThreshold - previousThreshold);
    setProgress(progress);
  };

  const getRankImage = () => {
    if (totalAmount < 10000) return require('../assets/1.png');
    if (totalAmount < 50000) return require('../assets/2.png');
    if (totalAmount < 100000) return require('../assets/3.png');
    if (totalAmount < 500000) return require('../assets/4.png');
    if (totalAmount < 1000000) return require('../assets/5.png');
    return require('../assets/6.png');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  
  const userspost= () => {
    navigation.navigate('MyPosts'); //유저가 작성한 게시글의 목록
  };

  const mydonation= () => {
    navigation.navigate('MyDonation'); //유저가 작성한 게시글의 목록
  };

  const handleMyInfo = () => {
    navigation.navigate('MyInfoScreen');
  };


  const handleVulnerableCertification = () => {
    navigation.navigate('VulnerableCertificationScreen');
  };

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();//파일 접근 권한
    if (permissionResult.granted === false) {
      alert("We need permission to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;
      const fileName = fileUri.split('/').pop();

      try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        const fileArrayBuffer = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
        await axios.put(`${azureUrl}/profile/${fileName}?${profileToken}`, fileArrayBuffer, {
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': 'image/jpeg'
          }
        });
        
        await axios.patch(`${apiUrl}/user/update/image`, {
          id: id,
          new_image: fileName
        });
        setProfileimage(fileName);
        alert("변경");
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={profileimage ? { uri: azureUrl+"/profile/"+profileimage } : require('../assets/logo.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileTitle}>
          <Text style={styles.userName}>{nickname}</Text>
        </View>
        <View style={styles.rankContainer}>
          <Image source={getRankImage()} style={styles.rankImage} />
          <Progress.Bar style={styles.progressBar} progress={progress} width={null} height={5} color="#3b5998" borderWidth={2} borderColor="#ddd"/>
        </View>
    </View>
    
    <View style={styles.infoBox}>
        <TextInput
          style={[styles.bioInput, { height: 80 }]}
          value={message}
          onChangeText={setMessage}
          placeholder="상태메세지"
          multiline
          numberOfLines={3}
        />
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={handleMyInfo}>
        <Text style={styles.menuText}>내정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={userspost}>
        <Text style={styles.menuText}>나의 게시글</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={mydonation}>
        <Text style={styles.menuText}>기부기록</Text>
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
    justifyContent: 'space-between'  // 프로필 헤더 내 요소들이 양쪽 끝으로 분포
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileTitle: {
    flex: 1,
    marginLeft: 25
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  rankContainer: {
    alignItems: 'center',  // 중앙 정렬
  },
  rankImage: {
    width: 80,
    height: 80,  // 랭크 이미지를 프로필 이미지와 같은 크기로 설정
  },
  progressBar: {
    marginTop: 10,
    width: 80,  // 게이지바 너비를 랭크 이미지와 동일하게 설정
  },
  infoBox: {
    padding: 16,
  },
  bioInput: {
    borderWidth: 3,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 16,
    fontSize: 18,
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

export default ProfileScreen