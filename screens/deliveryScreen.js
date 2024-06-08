import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { AppContext } from '../AppContext';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function DeliveryScreen() {
    const { id, name, phone, apiUrl } = useContext(AppContext);
    const route = useRoute();
    const weakId = route.params?.weakId; // Retrieve the weakId from navigation parameters

    const [productSize, setProductSize] = useState('XS');
    const [detailAddress, setDetailAddress] = useState('');
    const [basicAddress, setBasicAddress] = useState(''); // User will input this manually

    const handlePriceCheck = async () => {
        console.log({
            basicAddress,
            detailAddress,
            productSize,
            weak_id: weakId
        });
    
        try {
            const response = await axios.post(`${apiUrl}/delivery/price`, {
                basicAddress,
                detailAddress,
                productSize,
                weak_id: weakId
            });
            Alert.alert("가격 정보", `가격: ${response.data.price}원`);
        } catch (error) {
            console.error('가격 조회 실패:', error);
            if (error.response && error.response.data) {
                // 오류 메시지가 배열인지 확인하고 배열이면 join으로 문자열로 변환
                const errorMessage = Array.isArray(error.response.data.detail)
                    ? error.response.data.detail.join(', ')
                    : error.response.data.detail;
                Alert.alert("오류", `가격 조회에 실패했습니다: ${errorMessage}`);
            } else {
                Alert.alert("오류", "서버 응답 없음");
            }
        }
    };
    

    const handleCreateOrder = async () => {
        try {
            const response = await axios.post(`${apiUrl}/delivery/order`, {
                user_id: id,
                name,
                phone,
                basicAddress,
                detailAddress,
                productSize,
                weak_id: weakId
            });
            Alert.alert("Order Success", `Order ID: ${response.data}`);
        } catch (error) {
            console.error('Order creation failed:', error);
            Alert.alert("Error", "Failed to create the order.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick Delivery</Text>
            <Text style={styles.label}>Product Size</Text>
            <Picker
                selectedValue={productSize}
                style={styles.picker}
                onValueChange={setProductSize}>
                <Picker.Item label="XS" value="XS" />
                <Picker.Item label="S" value="S" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="L" value="L" />
            </Picker>
            <Text style={styles.label}>Basic Address</Text>
            <TextInput
                style={styles.input}
                onChangeText={setBasicAddress}
                value={basicAddress}
                placeholder="Enter basic address"
            />
            <Text style={styles.label}>Detailed Address</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDetailAddress}
                value={detailAddress}
                placeholder="Enter detailed address"
            />
            <Button title="Check Price" onPress={handlePriceCheck} />
            <Button title="Create Order" onPress={handleCreateOrder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    },
    picker: {
        width: '100%',
        marginBottom: 20
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20
    }
});
