/*
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
      //console.log(JSON.stringify(newsData, null, 2)); // 로드된 뉴스 데이터를 JSON 형식으로 로그 출력
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
      setArticles(newsData);
      //console.log(newsData);
    };

    loadNews();
  }, []);

  return (
    <ScrollView 
      style={styles.container}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: 'white',
    width: 300,  // 카드의 너비를 고정
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
