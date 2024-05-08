import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const NewsDetail = ({ route }) => {
  const { article } = route.params;
  console.log('Article Content:', article.content);
  console.log('Article Description:', article.description);


  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, '');  // 모든 HTML 태그 제거
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content|| article.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 300
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10
  },
  content: {
    fontSize: 16,
    padding: 10
  }
});

export default NewsDetail;
