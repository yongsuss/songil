//모금게시글 화면
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal, Pressable } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { AppContext } from '../AppContext';


const FundraisingBulletin = ({ route, navigation }) => {
  const { fundraisingId } = route.params; // Route에서 전달받은 fundraisingId
  const [fundraising, setFundraising] = useState(null);
  const [loading, setLoading] = useState(true);
  const { azureUrl } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchFundraisingDetails = async () => {
      try {
        const response = await axios.get(`http://20.39.190.194/fundraisings/prove/true`);
        const fundraisingData = response.data.find(item => item.id === fundraisingId);
        setFundraising(fundraisingData);
      } catch (error) {
        console.error('Failed to fetch fundraising details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFundraisingDetails();
  }, [fundraisingId]);

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedImage(null);
    };

  if (loading) {
    return <ActivityIndicator size="large" color="#4caf50" style={styles.loader} />;
  }

  if (!fundraising) {
    return <Text style={styles.errorText}>해당 게시글을 찾을 수 없습니다.</Text>;
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{fundraising.title}</Text>
      {fundraising.image && (
        <TouchableOpacity onPress={() => handleImagePress(azureUrl + '/fundraising/' + fundraising.image)}>
          <Image source={{ uri: azureUrl + '/fundraising/' + fundraising.image }} style={styles.image} />
        </TouchableOpacity>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{getCategoryName(fundraising.category)}</Text>
        <Text style={styles.description}>{fundraising.text}</Text>
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${(fundraising.current / fundraising.amount * 100).toFixed(2)}%` }]} />
          </View>
        </View>
        <Text style={styles.amount}>{`현재 모금액: ${formatAmount(fundraising.current)} / 목표액: ${formatAmount(fundraising.amount)}`}</Text>
        <Text style={styles.dates}>{`모금 기간: ${moment(fundraising.startdate).format('YYYY-MM-DD')} ~ ${moment(fundraising.enddate).format('YYYY-MM-DD')}`}</Text>
        <Text style={styles.participants}>{`참여자 수: ${fundraising.count}명`}</Text> 
        <TouchableOpacity style={styles.donateButton} onPress={() => navigation.navigate('Donate', { fundraisingId: fundraising.id })}>
          <Text style={styles.donateButtonText}>기부하기</Text>
        </TouchableOpacity>
      </View>
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
    </ScrollView>
  );
};

const getCategoryName = (category) => {
  const categories = ['기초생활수급자', '차상위계층수급자', '장애인', '한부모가족'];
  return categories[category] || '기타';
};

const formatAmount = (amount) => {
  if (amount >= 100000000) {
    return `${parseInt(amount / 100000000)}억원`;
  } else if (amount >= 10000) {
    return `${parseInt(amount / 10000)}만원`;
  } else if (amount >= 1000) {
    return `${parseInt(amount / 1000)}천원`;
  } else {
    return `${amount}원`;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // 중앙 정렬
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10
  },
  infoContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10
  },
  progressBarWrapper: {
    alignItems: 'center', // 중앙 정렬
    marginVertical: 10, // 상하 여백
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 10, // 둥근 모서리
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 10 // 둥근 모서리
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center' // 중앙 정렬
  },
  dates: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'right' // 텍스트를 오른쪽으로 정렬
  },
  donateButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  participants: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'right' // 텍스트를 오른쪽으로 정렬
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 반투명한 검은 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%', // 이미지 컨테이너 너비
    height: '80%', // 이미지 컨테이너 높이
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지를 비율에 맞춰 화면에 맞게 조정
  },
});

export default FundraisingBulletin;

