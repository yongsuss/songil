//유저가 작성한 게시글의 목록
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';

function MyPosts({ navigation }) {
  const { id, apiUrl } = useContext(AppContext); // AppContext에서 사용자 ID와 API URL 가져오기
  const [posts, setPosts] = useState([]); // 게시글 상태

  useEffect(() => {
    fetchPosts();
  }, [id, apiUrl]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/weakuser/board/${id}`);
      setPosts(response.data.map(post => ({
        ...post,
        day: formatDate(post.day) // 날짜를 yyyy-mm-dd 형식으로 포매팅
      })));
    } catch (error) {
      console.error('게시글을 불러오는데 실패했습니다:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
      if (error.response && error.response.status === 500) {
        // 405 Method Not Allowed 오류를 조용히 처리합니다.
        // 필요한 경우 여기에 로그를 남기거나 상태를 업데이트할 수 있습니다.
        console.log('500 Method Not Allowed - The method is not supported for the requested URL.');
        Alert.alert("오류", `게시글 삭제에 실패했습니다.`);
        
        //console.error('게시글을 삭제하는데 실패했습니다:', error);
      }
      //console.error('게시글을 삭제하는데 실패했습니다:', error);
    }
  };

  const navigateToUpdate = (post) => {
    navigation.navigate('BulletinUpdate', { post });
  };

  return (
    <ScrollView style={styles.container}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <TouchableOpacity 
            key={post.board_id} 
            style={styles.postContainer}
            onPress={() => navigateToUpdate(post)}
          >
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.text} numberOfLines={2}>{post.text}</Text>
            <Text style={styles.text}>작성일: {post.day}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDelete(post.board_id)}
            >
              <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noPostsText}>현재 내 게시글이 없습니다.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4', // 밝은 회색 배경
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',  // 진한 회색
  },
  text: {
    fontSize: 16,
    color: '#666',  // 중간 회색
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50, // 원형 버튼으로 변경
  },
  deleteButtonText: {
    color: 'white',
  },
  noPostsText: {
    textAlign: 'center', // 중앙 정렬
    fontSize: 16, // 폰트 사이즈
    color: '#666', // 폰트 색상
    marginTop: 20, // 상단 여백
  },
});

export default MyPosts;