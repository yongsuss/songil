//지역 게시판


import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function FundBoard({ navigation, route }) {
  const { region, subregion } = route.params;
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const regionQuery = encodeURIComponent(region + (subregion ? ` ${subregion}` : ''));
    let url = `http://20.39.190.194/board/region/${regionQuery}`;
    if (selectedCategory !== 'all') {
      url = `http://20.39.190.194/board/category/${selectedCategory}/region/${regionQuery}`;
    }
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // 데이터 구조 확인을 위해 로깅
      if (Array.isArray(data)) { // data가 배열인지 확인
        setBoards(data.map(item => ({ ...item.board, nickname: item.nickname })));
      } else if (data.boards && Array.isArray(data.boards)) { // data.boards가 배열인 경우
        setBoards(data.boards.map(item => ({ ...item.board, nickname: item.nickname })));
      } else {
        setBoards([]); // 배열이 아닐 경우 빈 배열 설정
      }
    })
    .catch(error => {
      console.error('Error loading boards:', error);
      setBoards([]); // 오류 발생 시 빈 배열 설정
    });
  }, [selectedCategory, region, subregion]); // 의존성 배열에 region, subregion 추가

  const getCategoryLabel = (category) => {
    switch (category) {
      case 0: return "기초생활수급자";
      case 1: return "차상위계층수급자";
      case 2: return "장애인";
      case 3: return "한부모가족";
      default: return "취약계층 정보 없음";
    }
  };

  const navigateToBulletin = (board) => {
    navigation.navigate('Bulletin', { board });
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="게시글 검색..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={styles.picker}
      >
        <Picker.Item label="모든 카테고리" value="all" />
        <Picker.Item label="기초생활수급자" value="0" />
        <Picker.Item label="차상위계층수급자" value="1" />
        <Picker.Item label="장애인" value="2" />
        <Picker.Item label="한부모가족" value="3" />
      </Picker>
      {boards.map((board, index) => (
        <TouchableOpacity key={index} style={styles.boardItem} onPress={() => navigateToBulletin(board)}>
          <Text style={styles.boardTitle}>{board.title}</Text>
          <Text style={styles.nickname}>{board.nickname || "익명"} - {getCategoryLabel(board.category)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10
  },
  form: {
    padding: 20
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  boardItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  nickname: {
    fontSize: 14,
    color: '#666'
  }
});

export default FundBoard;