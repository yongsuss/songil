import React from 'react';
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
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
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

      {/* 하단의 탭 네비게이터는 여기에 포함되지 않았습니다. */}
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
  editButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  editButtonText: {
    fontSize: 14,
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

export default ProfileScreen;
