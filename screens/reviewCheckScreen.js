import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// 가정한 리뷰 데이터
const reviews = [
  { id: 1, title: '리뷰 제목 1', content: '리뷰 내용 1' },
  { id: 2, title: '리뷰 제목 2', content: '리뷰 내용 2' },
  { id: 3, title: '리뷰 제목 3', content: '리뷰 내용 3' },
  // 추가적인 리뷰 데이터...
];

export default function ReviewCheckScreen() {
  const [selectedReview, setSelectedReview] = useState(null);

  const handleReviewPress = (review) => {
    setSelectedReview(review);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleReviewPress(item)} style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>리뷰 확인</Text>
      <Text style={styles.subtitle}>리뷰 개수: {reviews.length}</Text>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {selectedReview && (
        <View style={styles.selectedReviewContainer}>
          <Text style={styles.selectedReviewTitle}>{selectedReview.title}</Text>
          <Text style={styles.selectedReviewContent}>{selectedReview.content}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  selectedReviewContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  selectedReviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedReviewContent: {
    fontSize: 16,
  },
});
