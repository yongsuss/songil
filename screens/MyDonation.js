//사용자의 기부 목록
/*
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../AppContext';

const MyDonation = () => {
  const [activeTab, setActiveTab] = useState('fund'); // 초기 탭 설정
  const [donations, setDonations] = useState({ fund: [], item: [] });
  const navigation = useNavigation();
  const { apiUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // API에서 모든 기부 정보를 가져옴
        const response = await axios.get(`${apiUrl}/donations`);
        const { fund, item } = response.data;
        setDonations({ fund, item });
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };

    fetchDonations();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const DonationList = ({ type }) => (
    <ScrollView style={styles.listContainer}>
      {donations[type].map((donation, index) => (
        <TouchableOpacity key={index} style={styles.listItem} onPress={() => navigation.navigate('DonationDetails', { donationId: donation.id })}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{donation.title}</Text>
            <Text style={styles.details}>{type === 'fund' ? `${donation.amount}원` : `${donation.item} x ${donation.quantity}`}</Text>
            <Text style={styles.date}>{donation.date}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'fund' && styles.activeTab]} onPress={() => handleTabChange('fund')}>
          <Text style={[styles.tabText, activeTab === 'fund' && styles.activeTabText]}>기금 기부</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'item' && styles.activeTab]} onPress={() => handleTabChange('item')}>
          <Text style={[styles.tabText, activeTab === 'item' && styles.activeTabText]}>물품 기부</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'fund' ? <DonationList type="fund" /> : <DonationList type="item" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede'
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0000ff',
  },
  tabText: {
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  details: {
    fontSize: 14,
    marginBottom: 5
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right'
  }
});

export default MyDonation;*/


import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../AppContext';

const MyDonation = () => {
  const [donations, setDonations] = useState([]);
  const [reviews, setReviews] = useState({});
  const navigation = useNavigation();
  const { azureUrl, userId, apiUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // API에서 사용자가 기부한 모든 게시글 정보를 가져옴
        const response = await axios.get(`${apiUrl}/donations/board/${userId}`);
        setDonations(response.data);
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };

    fetchDonations();
  }, [apiUrl, userId]);

  const fetchReview = async (boardId) => {
    if (reviews[boardId]) {
      console.log(`Review already loaded for board ${boardId}`);
      return; // 이미 리뷰가 로드된 경우 다시 로드하지 않음
    }
  
    try {
      console.log(`Fetching review for board ${boardId}`);
      const response = await axios.get(`${apiUrl}/reviews/${boardId}`);
      console.log(`Fetched review for board ${boardId}:`, response.data);
      setReviews((prevReviews) => ({
        ...prevReviews,
        [boardId]: response.data
      }));
    } catch (error) {
      console.error(`Failed to fetch review for board ${boardId}:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.listContainer}>
        {donations.map((donation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => {
              fetchReview(donation.board_id);
              navigation.navigate('DonationDetails', { donationId: donation.id });
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{donation.title}</Text>
              <Text style={styles.details}>{`${donation.item} - ${donation.text}`}</Text>
              <Text style={styles.date}>{donation.day}</Text>
              {reviews[donation.board_id] && (
                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewTitle}>Review:</Text>
                  <Text style={styles.reviewText}>{reviews[donation.board_id].text}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  reviewContainer: {
    marginTop: 10,
  },
  reviewTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyDonation;


