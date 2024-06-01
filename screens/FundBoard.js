//지역 게시판
/*
import React, {, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function FundBoard({ route }) {
  const { region, subregion } = route.params;
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const regionQuery = encodeURIComponent(region + (subregion ? ` ${subregion}` : ''));
    fetch(`http://20.39.190.194/board/region/${regionQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.boards) {
        setBoards(data.boards);
      } else {
        setBoards([]);
      }
    })
    .catch(error => console.error('Error loading boards:', error));
  }, [region, subregion]);

  const getCategory = (category) => {
    switch (category) {
      case 0: return "기초생활수급자";
      case 1: return "차상위계층수급자";
      case 2: return "장애인";
      case 3: return "한부모가족";
      default: return "취약계층 정보 없음";
    }
  };

  const filteredBoards = boards.filter(board => 
    (board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.text.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'all' || board.category === parseInt(selectedCategory))
  );

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
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="모든 카테고리" value="all" />
        <Picker.Item label="기초생활수급자" value="0" />
        <Picker.Item label="차상위계층수급자" value="1" />
        <Picker.Item label="장애인" value="2" />
        <Picker.Item label="한부모가족" value="3" />
      </Picker>
      {filteredBoards.map((board, index) => (
        <View key={index} style={styles.boardItem}>
          <Text style={styles.boardTitle}>{board.title}</Text>
          <Text style={styles.nickname}>{board.nickname || "익명"} - {getCategory(board.category)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  boardItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  nickname: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  searchInput: {
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  }
});

export default FundBoard;*/

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function FundBoard({ navigation, route }) {
  const { region, subregion } = route.params;
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const regionQuery = encodeURIComponent(region + (subregion ? ` ${subregion}` : ''));
    fetch(`http://20.39.190.194/board/region/${regionQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.boards) {
        setBoards(data.boards);
      } else {
        setBoards([]);
      }
    })
    .catch(error => console.error('Error loading boards:', error));
  }, [region, subregion]);
  const getCategory = (category) => {
    switch (category) {
      case 0: return "기초생활수급자";
      case 1: return "차상위계층수급자";
      case 2: return "장애인";
      case 3: return "한부모가족";
      default: return "취약계층 정보 없음";
    }
  };

  const filteredBoards = boards.filter(board => 
    (board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.text.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'all' || board.category === parseInt(selectedCategory))
  );

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
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
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
          <Text style={styles.nickname}>{board.nickname || "익명"} - {getCategory(board.category)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  boardItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  nickname: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  searchInput: {
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  }
});

export default FundBoard;