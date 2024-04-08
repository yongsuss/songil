
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const RankItem = ({ rank, label }) => (
  <View style={styles.rankItem}>
    <Text style={styles.rankNumber}>{rank}</Text>
    <View style={styles.rankLabel}>
      <Text>{label}</Text>
    </View>
  </View>
);

const Rank = () => {
  // 'fund' 또는 'goods' 라는 상태를 이용해서 현재 보고 있는 랭킹의 종류를 결정합니다.
  const [activeRanking, setActiveRanking] = useState('fund'); // 'fund'가 초기값입니다.

  // 현재 활성화된 랭킹에 따라서 리스트를 렌더링하는 함수입니다.
  const renderRankList = (type) => (
    Array.from({ length: 5 }, (_, i) => (
      <RankItem key={i} rank={i + 1} label={type === 'fund' ? '기금' : '물품'} />
    ))
  );

  return (
    <View style={styles.container}>
      <View style={styles.rankingHeader}>
        <TouchableOpacity
          style={[styles.rankingHeaderButton, activeRanking === 'fund' && styles.activeRankingHeader]}
          onPress={() => setActiveRanking('fund')}>
          <Text style={styles.rankingHeaderText}>기금 랭킹</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rankingHeaderButton, activeRanking === 'goods' && styles.activeRankingHeader]}
          onPress={() => setActiveRanking('goods')}>
          <Text style={styles.rankingHeaderText}>물품 랭킹</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.rankingList}>
        {renderRankList(activeRanking)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
      },
      header: {
        padding: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      headerText: {
        fontSize: 20,
      },
      rankingList: {
        backgroundColor: '#fff',
      },
      rankingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      rankingHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      rankItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      rankNumber: {
        fontSize: 18,
        marginRight: 10,
      },
      rankLabel: {
        flex: 1,
      },
      navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
      },
  rankingHeaderButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activeRankingHeader: {
    borderBottomWidth: 3,
    borderBottomColor: '#000', // 활성 탭의 표시를 더 두껍게 하기 위해
  },
  // 나머지 스타일들...
});

export default Rank;
