//모금 화면

import React, { useContext, useEffect, useState , useCallback  } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppContext } from '../AppContext';

const FundraiserScreen = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [fundraisings, setFundraisings] = useState([]);
  const [filteredFundraisings, setFilteredFundraisings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const { azureUrl } = useContext(AppContext);
  const itemsPerPage = 10;
  const navigation = useNavigation(); // React Navigation 사용

  useFocusEffect(
    useCallback(() => {
      const fetchFundraisings = async () => {
        try {
          const response = await axios.get('http://20.39.190.194/fundraisings/prove/true');
          setFundraisings(response.data);
          setFilteredFundraisings(response.data);
        } catch (error) {
          console.error('Failed to fetch fundraisings:', error);
        }
      };

      fetchFundraisings();
    }, [])
  );

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = fundraisings.filter(fundraising => fundraising.title.toLowerCase().includes(text.toLowerCase()) && fundraising.prove);
    setFilteredFundraisings(filtered);
  };

  const getPageData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const getCategoryName = (category) => {
    const categories = ['기초생활수급자', '차상위계층수급자', '장애인', '한부모가족'];
    return categories[category] || '기타';
  };

  const navigateToDetails = (fundraising) => {
    const now = moment();
    const isCurrent = now.isAfter(moment(fundraising.startdate)) && now.isBefore(moment(fundraising.enddate));
    if (isCurrent) {
      navigation.navigate('FundraisingBulletin', { fundraisingId: fundraising.id });
    } else {
      alert('이 게시글은 현재 진행 중이지 않습니다.');
    }
  };

  const getCurrentDateFundraisings = () => {
    return filteredFundraisings.filter(fundraising => {
      const now = moment();
      return now.isAfter(moment(fundraising.startdate)) && now.isBefore(moment(fundraising.enddate));
    });
  };


  const getCompletedFundraisings = () => {
    return filteredFundraisings.filter(fundraising => {
      return moment().isAfter(moment(fundraising.enddate));
    });
  };

  const getUpcomingFundraisings = () => {
    return filteredFundraisings.filter(fundraising => {
      return moment().isBefore(moment(fundraising.startdate));
    });
  };


  const fundraisingData = () => {
    switch (activeTab) {
      case 'current':
        return getPageData(getCurrentDateFundraisings());
      case 'completed':
        return getPageData(getCompletedFundraisings());
      case 'upcoming':
        return getPageData(getUpcomingFundraisings());
      default:
        return [];
    }
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="게시글 검색..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('current')}>
          <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>진행중</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('completed')}>
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>완료</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('upcoming')}>
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>예정</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.listContainer}>
        {fundraisingData().map((fundraising, index) => (
          <TouchableOpacity key={index} style={styles.listItem} onPress={() => navigateToDetails(fundraising)}>
            {fundraising.image && <Image source={{ uri: azureUrl+'/fundraising/'+fundraising.image }} style={styles.image} />}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{fundraising.title}</Text>
              <Text style={styles.nickname}>{getCategoryName(fundraising.category)}</Text>
              <View style={styles.gaugeContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progress, { width: `${(fundraising.current / fundraising.amount * 100).toFixed(2)}%` }]} />
                </View>
                <Text style={styles.goalAmount}>{formatAmount(fundraising.current)} / {formatAmount(fundraising.amount)}</Text>
              </View>
              <Text style={styles.dates}>{`기간 - ${moment(fundraising.startdate).format('YYYY-MM-DD')} ~ ${moment(fundraising.enddate).format('YYYY-MM-DD')}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {[...Array(Math.ceil(filteredFundraisings.length / itemsPerPage)).keys()].map(n => (
          <TouchableOpacity key={n} style={styles.pageItem} onPress={() => setCurrentPage(n + 1)}>
            <Text style={styles.pageText}>{n + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  nickname: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  gaugeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  progressBar: {
    height: 10,
    backgroundColor: '#dedede',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  goalAmount: {
    minWidth: 80,
    textAlign: 'right'
  },
  dates: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right', // 텍스트를 오른쪽으로 정렬
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10
  },
  pageItem: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eeeeee',
    borderRadius: 5,
  },
  pageText: {
    color: '#000',
    fontWeight: 'bold',
  }
});

export default FundraiserScreen;