//랭크 화면
/*
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const RankScreen = () => {
  const [donationTotals, setDonationTotals] = useState([]);

  useEffect(() => {
    const fetchDonationTotals = async () => {
      try {
        const response = await axios.get('http://20.39.190.194/user_donation_totals/');
        setDonationTotals(response.data.sort((a, b) => b.total_amount - a.total_amount));
      } catch (error) {
        console.error('Error fetching donation totals:', error);
      }
    };

    fetchDonationTotals();
  }, []);

  const getImageForAmount = (amount) => {
    if (amount < 10000) return require('../assets/pngegg1.png');
    if (amount < 50000) return require('../assets/pngegg2.png');
    if (amount < 100000) return require('../assets/pngegg3.png');
    if (amount < 500000) return require('../assets/pngegg4.png');
    if (amount < 1000000) return require('../assets/pngegg5.png');
    return require('../assets/pngegg6.png');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={getImageForAmount(item.total_amount)} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`User ID: ${item.user_id}`}</Text>
        <Text style={styles.text}>{`Total Amount: ${item.total_amount}원`}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={donationTotals}
      renderItem={renderItem}
      keyExtractor={item => item.user_id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff'
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082', // 진보라색
    width: 50, // 순위 표시 공간 확보
    textAlign: 'center'
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10
  },
  text: {
    fontSize: 16,
    color: '#333'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // 이미지 둥글게 처리
    marginLeft: 10
  }
});

export default RankScreen;*/


import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const RankScreen = () => {
  const [donationTotals, setDonationTotals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDonationTotals = async () => {
      try {
        const response = await axios.get('http://20.39.190.194/user_donation_totals/');
        setDonationTotals(response.data.sort((a, b) => b.total_amount - a.total_amount));
      } catch (error) {
        console.error('Error fetching donation totals:', error);
      }
    };

    fetchDonationTotals();
  }, []);

  const getImageForAmount = (amount) => {
    if (amount < 10000) return require('../assets/1.png');
    if (amount < 50000) return require('../assets/2.png');
    if (amount < 100000) return require('../assets/3.png');
    if (amount < 500000) return require('../assets/4.png');
    if (amount < 1000000) return require('../assets/5.png');
    return require('../assets/pngegg6.png');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>
      <Image source={getImageForAmount(item.total_amount)} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`${item.user_id}`}</Text>
        <Text style={styles.text}>{`모금액: ${item.total_amount}원`}</Text>
      </View>
    </View>
  );

  const pageCount = Math.ceil(donationTotals.length / itemsPerPage);
  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={donationTotals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        renderItem={renderItem}
        keyExtractor={(item, index) => `donation-${index}`}
      />
      <View style={styles.pageContainer}>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
          <TouchableOpacity key={page} style={styles.pageNumber} onPress={() => changePage(page)}>
            <Text style={[styles.pageText, currentPage === page ? styles.activePage : null]}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff'
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    width: 50,
    textAlign: 'center'
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10
  },
  text: {
    fontSize: 16,
    color: '#333'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10
  },
  pageNumber: {
    marginHorizontal: 10
  },
  pageText: {
    color: '#000',
  },
  activePage: {
    fontWeight: 'bold',
    color: '#000'
  }
});

export default RankScreen;
