//사용자의 기부 목록

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';

const MyDonation = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('리뷰 기록');
  const [donations, setDonations] = useState([]);
  const [fundraisings, setFundraisings] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const { apiUrl, id } = useContext(AppContext);

  useEffect(() => {
    fetchDonations();
    fetchFundraisings();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${apiUrl}/donations/board/${id}`);
      setDonations(response.data);
    } catch (error) {
      

        console.error('Failed to fetch fundraisings:', error);
      
    }
  };

  const fetchFundraisings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fundraising_user/totals/${id}`);
      setFundraisings(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 404 오류인 경우 데이터를 비우고, 사용자에게 표시하지 않습니다.
        setFundraisings([]);
      }
      else {
        console.error('Failed to fetch fundraisings:', error);
      }
    }
  };

  const toggleExpand = (itemId) => {
    setExpandedId(expandedId === itemId ? null : itemId);
  };

  const renderContent = () => {
    if (activeTab === '리뷰 기록') {
      if (donations.length === 0) {
        return <Text style={styles.noDataText}>기록이 없습니다.</Text>;
      }
      return donations.map((donation, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('ReceivedReviews', { boardId: donation.board_id })}
          style={styles.listItem}>
          <Text style={styles.title}>{donation.title}</Text>
          <Text style={styles.details}>{`${donation.item} - ${donation.text}`}</Text>
          <Text style={styles.date}>게시일: {new Date(donation.day).toLocaleDateString()}</Text>
        </TouchableOpacity>
      ));
    } else {
      if (fundraisings.length === 0) {
        return <Text style={styles.noDataText}>기록이 없습니다.</Text>;
      }
      return fundraisings.map((fundraising, index) => (
        <TouchableOpacity key={index} onPress={() => toggleExpand(fundraising.id)} style={styles.listItem}>
          <Text style={styles.title}>{fundraising.title}</Text>
          <Text style={styles.details} >{`모금액: ${fundraising.amount}원`}</Text>
          {expandedId === fundraising.id && (
            <Text style={styles.details}>{`내용: ${fundraising.text}`}</Text>
          )}
        </TouchableOpacity>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '리뷰 기록' && styles.activeTab]}
          onPress={() => setActiveTab('리뷰 기록')}
        >
          <Text style={styles.tabText}>후기 기록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '모금 기록' && styles.activeTab]}
          onPress={() => setActiveTab('모금 기록')}
        >
          <Text style={styles.tabText}>모금 기록</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scroll: {
    padding: 10,
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyDonation;