import React, { useState } from 'react';
import { View, Text, Picker, Button, StyleSheet } from 'react-native';

export default function deliveryScreen() {
  const [selectedSize, setSelectedSize] = useState('xs');
  const [selectedLocation, setSelectedLocation] = useState('seoul');

  const locations = [
    // 지역 불러오기
    { label: '서울', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '대구', value: 'daegu' },
    { label: '인천', value: 'incheon' },
  ];

  const handleCheckPrice = () => {
    // 가격 조회 로직
    console.log({
      selectedSize,
      selectedLocation
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>퀵 배송</Text>
      <Text style={styles.label}>상품 크기</Text>
      <Picker
        selectedValue={selectedSize}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedSize(itemValue)}
      >
        <Picker.Item label="XS" value="xs" />
        <Picker.Item label="S" value="s" />
        <Picker.Item label="M" value="m" />
        <Picker.Item label="L" value="l" />
      </Picker>
      <Text style={styles.label}>출발 지점</Text>
      <Picker
        selectedValue={selectedLocation}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLocation(itemValue)}
      >
        {locations.map((location) => (
          <Picker.Item key={location.value} label={location.label} value={location.value} />
        ))}
      </Picker>
      <Button title="가격 조회" onPress={handleCheckPrice} style={styles.checkPriceButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20
  },
  checkPriceButton: {
    marginTop: 20
  }
});
