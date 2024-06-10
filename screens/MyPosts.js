//유저가 작성한 게시글의 목록
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';  // 경로는 실제 AppContext 위치에 따라 다를 수 있습니다.

const MyPosts = () => {
  const { id, apiUrl } = useContext(AppContext); // 사용자 ID와 API URL을 AppContext에서 가져옴
  const [posts, setPosts] = useState([]); // 게시글을 저장할 상태

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/weakuser/board/${id}`); // API 호출
        setPosts(response.data); // 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [id, apiUrl]);

  return (
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <View key={post.board_id} style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.text}>{post.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyPosts;
