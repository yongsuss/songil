//지역 게시판


import React, {  useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../AppContext';

function FundBoard({ navigation, route }) {
  const {azureUrl } = useContext(AppContext);
  const { region, subregion,l } = route.params;
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      if (Array.isArray(data)) {
        setBoards(data.map(item => ({ ...item.board, nickname: item.nickname })));
      } else if (data.boards && Array.isArray(data.boards)) {
        setBoards(data.boards.map(item => ({ ...item.board, nickname: item.nickname })));
      } else {
        setBoards([]);
      }
    })
    .catch(error => {
      console.error('Error loading boards:', error);
      setBoards([]);
    });
  }, [selectedCategory, region, subregion]);

  const getCategoryLabel = (category) => {
    switch (category) {
      case 0: return "기초생활수급자";
      case 1: return "차상위계층수급자";
      case 2: return "장애인";
      case 3: return "한부모가족";
      default: return "취약계층 정보 없음";
    }
  };

  const navigateToBulletin = (board) => {  //게시글 작성으로 가기
    navigation.navigate('Bulletin', { board });
  };

  const filteredBoards = boards
    .filter(board => board.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(boards.length / itemsPerPage);


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
      {filteredBoards.map((board, index) => (
        <TouchableOpacity key={index} style={styles.boardItem} onPress={() => navigateToBulletin(board)}>
          <View style={styles.boardContent}>
            <Text style={styles.boardTitle}>{board.title}</Text>
            <Text style={styles.nickname}>{board.nickname || "익명"} - {getCategoryLabel(board.category)}</Text>
          </View>
          {board.image && (
                <Image source={{ uri: azureUrl+'/board/'+board.image }} style={styles.boardImage} />
            )}
        </TouchableOpacity>
      ))}
      <View style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button key={page} title={page.toString()} onPress={() => setCurrentPage(page)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10
  },
  searchInput: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10
  },
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  boardItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center'
},
boardContent: {
    flex: 3,  // 텍스트 영역이 더 큰 공간을 차지하도록 설정
},
boardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
},
nickname: {
    fontSize: 14,
    color: '#666'
},
boardImage: {
    width: 80,  // 이미지 폭 고정
    height: 80,  // 이미지 높이 고정
    borderRadius: 8,  // 이미지 모서리 둥글게
    resizeMode: 'cover'  // 이미지 비율 유지하면서 영역 채우기
},
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    resizeMode: 'contain',
  }
});

export default FundBoard;
