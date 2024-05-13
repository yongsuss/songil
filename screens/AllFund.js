import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AllFund = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>모금함</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.segmentControl}>
          <Text style={styles.segmentText}>전체</Text>
          <Text style={styles.segmentText}>모금중</Text>
          <Text style={styles.segmentTextSelected}>모금 종료</Text>
        </View>
        <View style={styles.listItem}>
          {/* List items would go here */}
        </View>
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
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#fff',
  },
  segmentControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  segmentText: {
    fontSize: 16,
    color: 'black',
  },
  segmentTextSelected: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'red', // 선택된 탭에 적용할 색상을 지정합니다.
  },
  listItem: {
    // 여기에 리스트 아이템 스타일을 추가합니다.
  },
});

export default AllFund;
