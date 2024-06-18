//홈화면

import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation,useFocusEffect  } from '@react-navigation/native';
import fetchDonationNews from '../src/NewsService.js'; // 뉴스 데이터를 가져오는 함수
import axios from 'axios';
import { AppContext } from '../AppContext.js'; // AppContext를 가져옴

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [regionBoards, setRegionBoards] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();  // 네비게이션 훅 추가
  const { address, apiUrl, azureUrl } = useContext(AppContext); // 주소, API URL 및 Azure URL을 가져옴

  

  const loadAllData = async () => {
    const newsData = await fetchDonationNews();
    setArticles(newsData);

    try {
      const addressShort = address.slice(0, 6);
      const response = await axios.get(`${apiUrl}/board/region/${addressShort}`);
      setRegionBoards(response.data.boards || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 405 Method Not Allowed 오류를 조용히 처리합니다.
        // 필요한 경우 여기에 로그를 남기거나 상태를 업데이트할 수 있습니다.
        console.log('404 Method Not Allowed - The method is not supported for the requested URL.');
        setRegionBoards([]); // 오류 발생시에도 빈 배열로 설정
      }
      
      else {
    // 다른 종류의 오류에 대해 처리합니다.
         console.error('Error fetching region boards:', error);
      }
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadAllData(); // 화면이 포커스 될 때마다 데이터 로드
    }, [address, apiUrl])
  );


  const navigateToBulletin = (board) => {
    console.log("Navigating with board data:", board); // 네비게이션 전 게시글 정보 로깅
    navigation.navigate('HomeBulletin', { board: board.board, Nickname:board.nickname }); // board.board로 데이터 전달이 정확하게 이루어지는지 확인
};

const getCategoryLabel = (category) => {
  switch (category) {
    case 0: return "기초생활수급자";
    case 1: return "차상위계층수급자";
    case 2: return "장애인";
    case 3: return "한부모가족";
    default: return "취약계층 정보 없음";
  }
};

return (
  <ScrollView style={styles.container}>
    <Text style={styles.sectionTitle}>기부 관련 뉴스</Text>
    <ScrollView 
      style={styles.horizontalScroll} 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
    >
      {articles.map((article, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('NewsDetail', { article })}>
            <View style={styles.card}>
              <Image source={{ uri: article.urlToImage }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{article.title}</Text>
                <Text numberOfLines={3} style={styles.description}>
                  {article.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>

    <Text style={styles.sectionTitle}>내 지역 게시글</Text>
    <ScrollView 
      style={styles.horizontalScroll} 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
    >
      {regionBoards.length > 0 ? (
        regionBoards.filter(board => board.state !== false) // state가 false가 아닌 게시글만 필터링
        .map((board, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToBulletin(board)}>
            <View style={styles.boardCard}>
              {board.board.image && (
                <Image source={{ uri: `${azureUrl}/board/${board.board.image}` }} style={styles.boardImage} />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{board.board.title}</Text>
                <Text numberOfLines={2} style={styles.description}>
                  {board.nickname}-{getCategoryLabel(board.board.category)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>게시글이 없습니다.</Text>
        </View>
      )}
    </ScrollView>
  </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  horizontalScroll: {
    paddingLeft: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    width: 300,  // 모든 카드의 너비를 동일하게
    height: 300,  // 모든 카드의 높이를 동일하게
    marginRight: 10,
    borderRadius: 10,  // 모서리 둥글기 정도 증가
    shadowOpacity: 0.25,  // 그림자 불투명도 증가
    shadowRadius: 5,  // 그림자 반경 증가
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 4 },
    elevation: 5,
    overflow: 'hidden',  // 내용이 카드를 벗어나지 않도록 처리
  },
  image: {
    height: 150,  // 이미지 높이 조정
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  boardImage: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 15,  // 내부 패딩 증가
    alignItems: 'center',  // 텍스트 중앙 정렬
  },
  title: {
    fontSize: 20,  // 제목 폰트 크기 증가
    fontWeight: 'bold',
    color: '#333',  // 제목 색상 조정
  },
  description: {
    fontSize: 16,  // 설명 폰트 크기 증가
    color: '#666',  // 설명 텍스트 색상 조정
    marginTop: 5,
    textAlign: 'center',  // 텍스트 중앙 정렬
  },
  sectionTitle: {
    fontSize: 26,  // 섹션 타이틀 폰트 크기 증가
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
    borderBottomWidth: 2,  // 선의 두께 증가
    borderColor: '#ccc',
    paddingBottom: 10,
    textTransform: 'uppercase',  // 섹션 타이틀 대문자 변환
  },
  boardCard: {
    backgroundColor: 'white',
    width: 300,  // 모든 카드의 너비를 동일하게
    height: 300,  // 모든 카드의 높이를 동일하게
    marginRight: 20,  // 오른쪽 마진을 20으로 설정하여 카드 간의 거리를 넓힘
    borderRadius: 10,  // 모서리 둥글기 정도 증가
    shadowOpacity: 0.25,  // 그림자 불투명도 증가
    shadowRadius: 5,  // 그림자 반경 증가
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 4 },
    elevation: 5,
    overflow: 'hidden',  // 내용이 카드를 벗어나지 않도록 처리
  },
  noDataContainer: {
    flex: 1, // 이 컨테이너가 차지할 수 있는 최대 공간을 차지하도록 설정
    alignItems: 'center', // 가로축을 중심으로 정렬
    justifyContent: 'center', // 세로축을 중심으로 정렬
    height: 100 // 메시지를 표시할 영역의 높이 지정
  },
  noDataText: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;