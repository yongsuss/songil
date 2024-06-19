//랭크 화면

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; // useFocusEffect를 import

const RankScreen = () => {
  const [donationTotals, setDonationTotals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useFocusEffect(
    React.useCallback(() => {
      const fetchDonationTotals = async () => {
        try {
          const response = await axios.get('http://20.39.190.194/user_donation_totals/');
          setDonationTotals(response.data.sort((a, b) => b.total_amount - a.total_amount));
          setFilteredResults(response.data.sort((a, b) => b.total_amount - a.total_amount));
        } catch (error) {
          console.error('Error fetching donation totals:', error);
        }
      };

      fetchDonationTotals();
      return () => {
        // 이 부분은 화면에서 벗어날 때 수행되는 클린업 함수입니다.
        // 필요한 경우 클린업 로직을 추가할 수 있습니다.
      };
    }, [])
  );

  useEffect(() => {
    const results = donationTotals.filter(donation =>
      donation.nickname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(results);
    setCurrentPage(1); // Reset to the first page with new search results
  }, [searchQuery, donationTotals]);

  const getImageForAmount = (amount) => {
    if (amount < 10000) return require('../assets/1.png');
    if (amount < 50000) return require('../assets/2.png');
    if (amount < 100000) return require('../assets/3.png');
    if (amount < 500000) return require('../assets/4.png');
    if (amount < 1000000) return require('../assets/5.png');
    return require('../assets/6.png');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>
      <Image source={getImageForAmount(item.total_amount)} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`${item.nickname}`}</Text>
        <Text style={styles.text}>{`모금액: ${item.total_amount}원`}</Text>
      </View>
    </View>
  );

  const pageCount = Math.ceil(filteredResults.length / itemsPerPage);
  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="닉네임으로 검색"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredResults.length > 0 ? (
        <>
          <FlatList
            data={filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
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
        </>
      ) : (
        <Text style={styles.noDataText}>반영된 랭크가 없습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20
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
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666'
  }
});

export default RankScreen;