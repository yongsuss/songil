//사용자의 기부 목록
/* 
  import React, { useContext, useEffect, useState } from 'react';
  import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Alert, Pressable } from 'react-native';
  import axios from 'axios';
  import { AppContext } from '../AppContext';
  
  const MyDonation = ({navigation}) => {
    const [activeTab, setActiveTab] = useState('donations');
    const [donations, setDonations] = useState([]);
    const [fundraisings, setFundraisings] = useState([]);
    const { apiUrl, id, azureUrl } = useContext(AppContext);

  
    useEffect(() => {
      fetchDonations();
      fetchFundraisings();
    }, []);
  
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/donations/board/${id}`);
        setDonations(response.data);
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };
  
    const fetchFundraisings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/fundraising_user/totals/${id}`);
        setFundraisings(response.data);
      } catch (error) {
        console.error('Failed to fetch fundraisings:', error);
      }
    };
  
  
    const renderContent = () => {
      if (activeTab === 'donations') {
        return donations.map((donation, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('ReceivedReviews', { boardId: donation.board_id })}>
            <Text style={styles.title}>{donation.title}</Text>
            <Text style={styles.details}>{`${donation.item} - ${donation.text}`}</Text>
            <Text style={styles.date}>게시일: {new Date(donation.day).toLocaleDateString()}</Text>
          </TouchableOpacity>
        ));
      } else {
        return fundraisings.map((fundraising, index) => (
          <TouchableOpacity key={index} style={styles.listItem}>
            <Text style={styles.title}>{fundraising.title}</Text>
            <Text style={styles.details} >{`모금액: ${fundraising.amount}원`}</Text>
            <Text style={styles.details} numberOfLines={2}>{`내용: ${fundraising.text}`}</Text>
          </TouchableOpacity>
        ));
      }
    };
  
    const closeModal = () => {
      setIsModalVisible(false);
      setSelectedImage(null);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'donations' && styles.activeTab]}
            onPress={() => setActiveTab('donations')}
          >
            <Text style={styles.tabText}>Donations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'fundraisings' && styles.activeTab]}
            onPress={() => setActiveTab('fundraisings')}
          >
            <Text style={styles.tabText}>Fundraisings</Text>
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
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    closeButton: {
      padding: 10,
      elevation: 2,
    },
    closeButtonText: {
      color: '#2196F3',
      fontWeight: 'bold',
      textAlign: 'right',
    },
    reviewText: {
      marginBottom: 15,
      textAlign: 'center',
      color: '#333',
      fontSize: 16,
    },
    reviewImage: {
      width: 300,
      height: 300,
      borderRadius: 15,
    },
    fullscreenImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });
  
  export default MyDonation;*/
/*
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';

const MyDonation = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('donations');
  const [donations, setDonations] = useState([]);
  const [fundraisings, setFundraisings] = useState([]);
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
      console.error('Failed to fetch donations:', error);
    }
  };

  const fetchFundraisings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fundraising_user/totals/${id}`);
      setFundraisings(response.data);
    } catch (error) {
      console.error('Failed to fetch fundraisings:', error);
    }
  };

  const renderContent = () => {
    if (activeTab === 'donations') {
      return donations.map((donation, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('ReceivedReviews', { boardId: donation.board_id })}
          style={styles.listItem}>
          <Text style={styles.title}>{donation.title}</Text>
          <Text style={styles.details}>{`${donation.item} - ${donation.text}`}</Text>
          <Text style={styles.date}>게시일: {new Date(donation.day).toLocaleDateString()}</Text>
        </TouchableOpacity>
      ));
    } else {
      return fundraisings.map((fundraising, index) => (
        <TouchableOpacity key={index} onPress={() => toggleExpand(fundraising.id)} style={styles.listItem}>
          <Text style={styles.title}>{fundraising.title}</Text>
          <Text style={styles.details} >{`모금액: ${fundraising.amount}원`}</Text>
        </TouchableOpacity>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'donations' && styles.activeTab]}
          onPress={() => setActiveTab('donations')}
        >
          <Text style={styles.tabText}>Donations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'fundraisings' && styles.activeTab]}
          onPress={() => setActiveTab('fundraisings')}
        >
          <Text style={styles.tabText}>Fundraisings</Text>
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
});

export default MyDonation;*/

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
      console.error('Failed to fetch donations:', error);
    }
  };

  const fetchFundraisings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fundraising_user/totals/${id}`);
      setFundraisings(response.data);
    } catch (error) {
      console.error('Failed to fetch fundraisings:', error);
    }
  };

  const toggleExpand = (itemId) => {
    setExpandedId(expandedId === itemId ? null : itemId);
  };

  const renderContent = () => {
    if (activeTab === '리뷰 기록') {
      return donations.map((donation, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('ReceivedReviews', { boardId: donation.board_id })}
          style={styles.listItem}>
          <Text style={styles.title}>{donation.title}</Text>
          <Text style={styles.details}>{`${donation.item} - ${donation.text}`}</Text>
          <Text style={styles.date}>게시일: {new Date(donation.day).toLocaleDateString()}</Text>
        </TouchableOpacity>
      ));
    } else {
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
});

export default MyDonation;