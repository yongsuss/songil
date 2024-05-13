//뉴스api키:d96b7ff4c19848e4befe29d24f9f7183
/*import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>songil</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>홈기 및 사용방침</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>관련 뉴스</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>모금 현황</Text>
        </View>
       
      </ScrollView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // 배경 색상
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // 상단 및 하단 여백
  },
  scrollView: {
    flex: 1, // 스크롤 뷰가 전체 화면을 차지하도록
  },
  section: {
    backgroundColor: '#f0f0f0', // 섹션의 배경 색상
    paddingVertical: 20, // 세로 여백
    paddingHorizontal: 16, // 가로 여백
    borderBottomWidth: 1, // 하단 테두리
    borderBottomColor: '#e0e0e0', // 하단 테두리 색상
    marginBottom: 10, // 섹션 간 여백
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;*/

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import fetchDonationNews from '../src/NewsService.js';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();  // 네비게이션 훅 추가
  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchDonationNews();
      console.log(JSON.stringify(newsData, null, 2)); // 로드된 뉴스 데이터를 JSON 형식으로 로그 출력
      setArticles(newsData);
    };

    loadNews();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
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
});

export default Home;
