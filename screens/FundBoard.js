import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const FundBoard = () => {
  // TODO: 실제 데이터를 사용할 경우, 여기에 상태 관리 로직을 추가해야 합니다.

  // 아이템을 렌더링하는 함수, 실제 앱에서는 이벤트 핸들러를 추가할 수 있습니다.
  const renderSection = (title) => (
    <TouchableOpacity style={styles.section} onPress={() => console.log(`${title} 선택됨`)}>
      <Text style={styles.sectionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderSection('기부 캠페인')}
        {/* 추가 섹션을 더 렌더링 할 수 있습니다. */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // 배경 색상
  },
  section: {
    backgroundColor: '#f0f0f0', // 섹션의 배경 색상
    padding: 20, // 섹션 내부 여백
    marginVertical: 10, // 섹션 간 수직 여백
    marginHorizontal: 16, // 섹션 간 수평 여백
    borderRadius: 10, // 섹션의 테두리 둥글기
    // 그림자 효과는 플랫폼 별로 다를 수 있으므로 조정이 필요합니다.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // 안드로이드에서의 그림자 효과
  },
  sectionText: {
    fontSize: 18, // 텍스트 크기
    fontWeight: 'bold', // 텍스트 굵기
  },
  // 추가 스타일 요소가 필요할 수 있습니다.
});

export default FundBoard;
