import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const regions = [
  { name: '서울', districts: ['강남구', '강동구', '강북구', '강서구', '관악구'] },
  { name: '인천', districts: ['강화군', '계양구'] },
  { name: '대전', districts: ['대덕구', '동구'] },
  // 다른 지역들도 여기에 추가...
];

const RegionScreen = () => {
  const navigation = useNavigation();

  const handlePress = (regionName) => {
    // 'RegionPosts' 스크린으로 네비게이션하며, 선택된 지역 이름을 파라미터로 전달
    navigation.navigate('RegionPosts', { regionName });
  };

  return (
    <ScrollView style={styles.container}>
      {regions.map((region, index) => (
        <TouchableOpacity key={index} style={styles.regionItem} onPress={() => handlePress(region.name)}>
          <Text style={styles.regionText}>{region.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  regionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  regionText: {
    fontSize: 18,
    color: '#333'
  }
});

export default RegionScreen;
