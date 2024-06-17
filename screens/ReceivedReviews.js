/*
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';

const ReceivedReviews = ({ route }) => {
  const { boardId } = route.params;
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, nickname, azureUrl } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://20.39.190.194/reviews/${boardId}`);
        setReview(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch review data');
        console.error('Error fetching review:', error);
        setLoading(false);
      }
    };

    fetchReview();
  }, [boardId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!review) {
    return <Text>No review found.</Text>;
  }

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
};

const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.reviewCard}>
          <Text style={styles.text}>당신이 도와준 날 - {new Date(review.day).toLocaleDateString()}</Text>
          <Text style={styles.textContent}>당신에게 전하는 말 - {review.text}</Text>
          {review.image && (
            <TouchableOpacity onPress={() => handleImagePress(azureUrl + '/review/' + review.image)}>
          <Image source={{ uri: azureUrl + '/review/' + review.image }} style={styles.boardImage} />
          </TouchableOpacity>
        )}
        </View>
      </ScrollView>
      <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <Pressable style={styles.modalContainer} onPress={closeModal}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
                        )}
                    </Pressable>
                </View>
            </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5
  },
  textContent: {
    fontSize: 16,
    color: '#333'
  },
  boardImage: {
    width: '100%', // Make image full width
    height: 200, // Set fixed height, or adjust as needed
    resizeMode: 'cover', // Ensure the image covers the entire area
    marginTop: 20,
    marginBottom: 20,
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지를 비율에 맞춰 화면에 맞게 조정
  },
});

export default ReceivedReviews;*/

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';

const ReceivedReviews = ({ route }) => {
  const { boardId } = route.params;
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, nickname, azureUrl } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://20.39.190.194/reviews/${boardId}`);
        setReview(response.data);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch review data');
        console.error('Error fetching review:', error);
        setLoading(false);
      }
    };

    fetchReview();
  }, [boardId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!review) {
    return <Text>No review found.</Text>;
  }

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.reviewCard}>
          <Text style={styles.text}>당신이 도와준 날 - {new Date(review.day).toLocaleDateString()}</Text>
          <Text style={styles.text}>-----------당신에게 전하는 말-----------</Text>
          <Text style={styles.textContent}>{review.text}</Text>
          {review.image && (
            <TouchableOpacity onPress={() => handleImagePress(azureUrl + '/review/' + review.image)}>
              <Image source={{ uri: azureUrl + '/review/' + review.image }} style={styles.boardImage} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <Pressable style={styles.modalContainer} onPress={closeModal}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
            )}
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  scrollContainer: {
    padding: 20,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5
  },
  textContent: {
    fontSize: 16,
    color: '#333'
  },
  boardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop: 20,
    marginBottom: 20,
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default ReceivedReviews;
