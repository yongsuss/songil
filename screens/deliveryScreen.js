import React, { useState, useContext } from 'react';
import { View, Text, Picker, Button, StyleSheet } from 'react-native';
import { AppContext } from '../AppContext';

export default function DeliveryScreen() {
  const context = useContext(AppContext);

  if (!context) {
    return <Text>Loading...</Text>; // context가 null 또는 undefined일 때의 처리
  }

  const {
    id,
    nickname,
    message,
    setNickname,
    setMessage,
    profileimage,
    setProfileimage,
    apiUrl,
    azureUrl,
    address
  } = context;

  const [selectedSize, setSelectedSize] = useState('xs');
  const [selectedLocation, setSelectedLocation] = useState(address[0]?.value || '');

  const locations = address.map(addr => ({
    label: addr.label,
    value: addr.value
  }));

  /*
  const handleCheckPrice = () => {
    console.log({
      selectedSize,
      selectedLocation
    });
  };
*/
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
