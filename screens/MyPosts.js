//유저가 작성한 게시글의 목록
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';  // 실제 AppContext의 위치에 따라 경로가 달라질 수 있습니다.

const MyPosts = ({ navigation }) => {
  const { id, apiUrl } = useContext(AppContext); // AppContext에서 사용자 ID와 API URL 가져오기
  const [posts, setPosts] = useState([]); // 게시글 상태

  useEffect(() => {
    fetchPosts();
  }, [id, apiUrl]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/weakuser/board/${id}`);
      setPosts(response.data);
    } catch (error) {
      console.error('게시글을 불러오는데 실패했습니다:', error);
    }
  };

  const confirmDelete = (postId) => {
    Alert.alert(
      "게시글 삭제",
      "정말로 이 게시글을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", onPress: () => deletePost(postId) }
      ]
    );
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${apiUrl}/board/delete/${postId}`);
      fetchPosts(); // 게시글 목록 새로 고침
    } catch (error) {
      console.error('게시글을 삭제하는데 실패했습니다:', error);
    }
  };

  const navigateToUpdate = (post) => {
    console.log("Navigating to BulletinUpdate with:", post);
    navigation.navigate('BulletinUpdate', { post });
  };
  return (
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <TouchableOpacity 
            key={post.board_id} 
            style={styles.postContainer}
            onPress={() => navigateToUpdate(post)}  // 게시글 클릭 시 업데이트 함수 호출
          >
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.text} numberOfLines={2}>{post.text}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(post.board_id)}
          >
            <Text style={styles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>
        </TouchableOpacity>
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
  deleteButton: {
    position: 'absolute',
    right: 5, // 모서리에 더 가깝게 조정
    bottom: 5,
    padding: 5, // 버튼 크기 줄임
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12, // 텍스트 크기 줄임
  },
});

export default MyPosts;
