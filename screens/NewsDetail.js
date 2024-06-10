import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const NewsDetail = ({ route }) => {
  const { article } = route.params;
  //console.log('Article Content:', article.content);
  //console.log('Article Description:', article.description);


  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, '');  // 모든 HTML 태그 제거
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <View style={{width : "100%", flexDirection: 'column', alignItems: 'flex-end', paddingRight: 10}}>
      <Text>{formatDate(article.publishedAt)}</Text>
        {article.author && (
        <View>
          <Text>{article.author}</Text>
        </View>
      )}
      </View>
      <Text style={styles.content}>{article.content|| article.description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(article.url)}>
        <Text style={styles.buttonText}>더보기 링크</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
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
  },
  button: {
    backgroundColor: '#a0a0a0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16
},
});

export default NewsDetail;
