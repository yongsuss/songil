import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>songil</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>홈기 및 사용방침</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>관련 뉴스</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>모금 현황</Text>
        </View>
        {/* 다른 섹션들을 여기에 추가하세요. */}
      </ScrollView>
      {/* Tab Navigator의 Tab Bar는 여기에 포함되지 않았으며, Navigation 구조에 정의되어 있을 것입니다. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // 배경 색상
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // 상단 및 하단 여백
  },
  scrollView: {
    flex: 1, // 스크롤 뷰가 전체 화면을 차지하도록
  },
  section: {
    backgroundColor: '#f0f0f0', // 섹션의 배경 색상
    paddingVertical: 20, // 세로 여백
    paddingHorizontal: 16, // 가로 여백
    borderBottomWidth: 1, // 하단 테두리
    borderBottomColor: '#e0e0e0', // 하단 테두리 색상
    marginBottom: 10, // 섹션 간 여백
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
