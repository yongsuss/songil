//모금 화면
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const FundraiserScreen = () => {
  const [activeTab, setActiveTab] = React.useState('current'); // 탭 상태 관리

  return (
    <View style={styles.container}>
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
        {activeTab === 'current' && <Text style={styles.listItem}>현재 진행 중인 모금 리스트</Text>}
        {activeTab === 'completed' && <Text style={styles.listItem}>완료된 모금 리스트</Text>}
        {activeTab === 'upcoming' && <Text style={styles.listItem}>예정된 모금 리스트</Text>}
      </ScrollView>
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
    borderBottomColor: '#dedede',
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
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default FundraiserScreen;
