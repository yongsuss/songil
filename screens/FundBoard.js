import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FundBoard = () => {
  // 가상의 게시글 데이터
  const posts = [
    { id: 1, title: '기부 캠페인 #1' },
    { id: 2, title: '기부 캠페인 #2' },
    // 다른 게시글들도 여기에 추가...
  ];

  return (
    <ScrollView style={styles.container}>
      {posts.map(post => (
        <View key={post.id} style={styles.postItem}>
          <Text style={styles.postTitle}>{post.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  postItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10
  },
  postTitle: {
    fontSize: 16,
    color: '#000'
  }
});

export default FundBoard;
