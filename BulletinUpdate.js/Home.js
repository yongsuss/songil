//홈화면
/*
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchDonationNews from '../src/NewsService.js'; // 뉴스 데이터를 가져오는 함수
import axios from 'axios';
import { AppContext } from '../AppContext'; // AppContext를 가져옴

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [regionBoards, setRegionBoards] = useState([]);
  const navigation = useNavigation();  // 네비게이션 훅 추가
  const { address, apiUrl, azureUrl } = useContext(AppContext); // 주소, API URL 및 Azure URL을 가져옴

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchDonationNews();
      setArticles(newsData);
    };

    const loadRegionBoards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/board/region/${address}`);
        setRegionBoards(response.data.boards);
      } catch (error) {
        console.error('Error fetching region boards:', error);
      }
    };

    loadNews();
    loadRegionBoards();
  }, [address, apiUrl]);

  const navigateToBulletin = (board) => {
    console.log("Navigating with board data:", board); // 네비게이션 전 게시글 정보 로깅
    navigation.navigate('HomeBulletin', { board: board.board }); // board.board로 데이터 전달이 정확하게 이루어지는지 확인
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
      <Text style={styles.sectionTitle}>Donation News</Text>
      <ScrollView 
        style={styles.horizontalScroll} 
        horizontal={true}  // 스크롤 방향을 수평으로 설정
        showsHorizontalScrollIndicator={false}  // 수평 스크롤바 숨기기
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
        horizontal={true}  // 스크롤 방향을 수평으로 설정
        showsHorizontalScrollIndicator={false}  // 수평 스크롤바 숨기기
      >
        {regionBoards.map((board, index) => (
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
        ))}
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
    width: 300,  // 카드의 너비를 고정
    height: 300,
    marginRight: 10,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    elevation: 3,
  },
  boardCard: {
    backgroundColor: 'white',
    width: 200,  // 게시글 카드의 너비를 고정
    marginRight: 10,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    elevation: 3,
  },
  image: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  boardImage: {
    height: 100,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    borderBottomWidth: 1,  // 섹션 타이틀 아래에 선 추가
    borderColor: '#ccc',   // 선의 색상
    paddingBottom: 10      // 섹션 타이틀과 선 사이의 간격
  },
});

export default Home;*/
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchDonationNews from '../src/NewsService.js'; // 뉴스 데이터를 가져오는 함수
import axios from 'axios';
import { AppContext } from '../AppContext.js'; // AppContext를 가져옴

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [regionBoards, setRegionBoards] = useState([]);
  const navigation = useNavigation();  // 네비게이션 훅 추가
  const { address, apiUrl, azureUrl } = useContext(AppContext); // 주소, API URL 및 Azure URL을 가져옴

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchDonationNews();
      setArticles(newsData);
    };

    const loadRegionBoards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/board/region/${address}`);
        setRegionBoards(response.data.boards);
      } catch (error) {
        console.error('Error fetching region boards:', error);
      }
    };

    loadNews();
    loadRegionBoards();
  }, [address, apiUrl]);

  const navigateToBulletin = (board) => {
    console.log("Navigating with board data:", board); // 네비게이션 전 게시글 정보 로깅
    navigation.navigate('HomeBulletin', { board: board.board }); // board.board로 데이터 전달이 정확하게 이루어지는지 확인
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
        horizontal={true}  // 스크롤 방향을 수평으로 설정
        showsHorizontalScrollIndicator={false}  // 수평 스크롤바 숨기기
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
        horizontal={true}  // 스크롤 방향을 수평으로 설정
        showsHorizontalScrollIndicator={false}  // 수평 스크롤바 숨기기
      >
        {regionBoards.map((board, index) => (
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
        ))}
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
});

export default Home;