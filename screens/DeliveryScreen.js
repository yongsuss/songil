// 기부 배송 화면 
/*
import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

export default function DeliveryScreen() {
    const { id, name, phone, apiUrl, authToken } = useContext(AppContext);
    const route = useRoute();
    const weakId = route.params?.weakId; // Retrieve the weakId from navigation parameters

    const [productSize, setProductSize] = useState('XS');
    const [detailAddress, setDetailAddress] = useState('');
    const [basicAddress, setBasicAddress] = useState(''); // User will input this manually
    const [isAddressValid, setIsAddressValid] = useState(null); // Address validity state

    const [expoPushToken, setExpoPushToken] = useState(''); // Expo 푸시 토큰을 저장할 상태
    const [notification, setNotification] = useState(false); // 수신된 알림을 저장할 상태
    const notificationListener = useRef(); // 알림 수신 리스너를 참조
    const responseListener = useRef(); // 알림 응답 리스너를 참조

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
            }, {
            
            });
            Alert.alert("가격 정보", `가격: ${response.data.price}원`);
        } catch (error) {
            console.error('가격 조회 실패:', error);
            const errorMessage = error.response?.data?.detail || error.message;
            Alert.alert("오류", `가격 조회에 실패했습니다: ${errorMessage}`);
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
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}` // 필요한 경우 인증 토큰 추가
                }
            });
            Alert.alert("Order Success", `Order ID: ${response.data}`);
            await sendPushNotification(expoPushToken); // 취약계층에게 푸시 알림 전송
        } catch (error) {
            console.error('Order creation failed:', error);
            const errorMessage = error.response?.data?.detail || error.message;
            Alert.alert("Error", `주문 생성에 실패했습니다: ${errorMessage}`);
        }
    };

    const handleCheckAddress = async () => {
        try {
            const response = await axios.get(`${apiUrl}/check-address/${basicAddress}`);
            setIsAddressValid(response.data === 'Valid');
            if(response.data) {
                Alert.alert("주소 확인", "유효한 주소입니다.");
            }
        } catch (error) {
            console.error('주소 확인 실패:', error);
            Alert.alert("Error", "주소 확인에 실패했습니다.");
        }
    };

    useEffect(() => {
        // 푸시 알림을 위한 등록 함수 호출
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        // 알림 수신 리스너 설정
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // 알림 응답 리스너 설정
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        // 컴포넌트 언마운트 시 리스너 정리
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>상품 사이즈</Text>
            <Picker
                selectedValue={productSize}
                style={styles.picker}
                onValueChange={setProductSize}>
                <Picker.Item label="XS" value="XS" />
                <Picker.Item label="S" value="S" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="L" value="L" />
            </Picker>
            <Text style={styles.label}>기본 주소</Text>
            <TextInput
                style={styles.input}
                onChangeText={setBasicAddress}
                value={basicAddress}
                placeholder="기본 주소 입력"
            />
            <TouchableOpacity style={styles.checkAddressButton} onPress={handleCheckAddress}>
                <Text style={styles.checkAddressButtonText}>주소 확인</Text>
            </TouchableOpacity>
            <Text style={styles.label}>상세 주소</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDetailAddress}
                value={detailAddress}
                placeholder="상세 주소 입력"
            />
            <TouchableOpacity style={styles.priceCheckButton} onPress={handlePriceCheck}>
                <Text style={styles.priceCheckButtonText}>가격 조회</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderButton} onPress={handleCreateOrder}>
                <Text style={styles.orderButtonText}>주문하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333',
    },
    picker: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    checkAddressButton: {
        marginTop: 10,
        paddingVertical: 15,
        backgroundColor: '#4caf50',
        borderRadius: 10,
        alignItems: 'center',
    },
    checkAddressButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceCheckButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#f1c40f',
        borderRadius: 10,
        alignItems: 'center',
    },
    priceCheckButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DeliveryScreen;
*/
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AppContext, apiUrl } from '../AppContext';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 가져오기

export default function DeliveryScreen() {
    const { id, name, phone, apiUrl, authToken } = useContext(AppContext);
    const route = useRoute();
    const weakId = route.params?.weakId; // 네비게이션 매개변수에서 weakId를 가져옵니다.
    const boardId = route.params?.boardId;
    const [productSize, setProductSize] = useState('XS');
    const [detailAddress, setDetailAddress] = useState('');
    const [basicAddress, setBasicAddress] = useState(''); // 사용자가 직접 입력하는 기본 주소
    const [isAddressValid, setIsAddressValid] = useState(null); // 주소 유효성 상태
    const navigation = useNavigation(); // 네비게이션 객체 사용

    const notification = async () => { //알림
        const postData = {
          id: weakId,
          title: "배송이 시작되었습니다.",
          message: "배송을 받으셨으면 후기 작성해주세요."
        };
    
        try {
            const response = await axios.post(`${apiUrl}/notification/send`,postData);
            console.log(response.data);
        } catch (error) {
            console.log('알림전송 실패:', error);
        }
    };

    const handlePriceCheck = async () => {
        console.log({
            basicAddress,
            detailAddress,
            productSize,
            weak_id: weakId,
            boardId
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
            //console.error('가격 조회 실패:', error);
            const errorMessage = error.response?.data?.detail || error.message;
            Alert.alert("가격 조회 실패", `상대 혹은 당신의 주소가 유효하지 않습니다.`);
        }
    };

    const handleCreateOrder = async () => {
        try {
            // 주문 생성 API 호출
            const response = await axios.post(`${apiUrl}/delivery/order`, {
                user_id: id,
                name,
                phone,
                basicAddress,
                detailAddress,
                productSize,
                weak_id: weakId
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}` // 필요한 경우 인증 토큰 추가
                }
            });

            const orderId = response.data;
            Alert.alert("Order Success", `Order ID: ${orderId}`);

            // 주문 성공 후, 기부 추가 API 호출
            try {
                const donationResponse = await axios.post(`${apiUrl}/donations/add/`, {
                    board_id: boardId,
                    id: id // 사용자 ID를 기부에 추가
                });
                Alert.alert("물품 전송!", `물품이 전송될것입니다.`);
                notification();
                navigation.goBack(); // 이전 화면으로 돌아가기

            } catch (error) {
                //console.error('Donation creation failed:', error);
                
                //Alert.alert("기부 생성 실패", `${errorMessage}`);
                if (error.response && error.response.status === 400) {
                    Alert.alert("기부 생성 실패", `${errorMessage}`);
                    
                    // 필요한 경우 여기에 로그를 남기거나 상태를 업데이트할 수 있습니다.
                    console.log('400 Method Not Allowed - The method is not supported for the requested URL.');
                  }
            }

        } catch (error) {
            //console.error('Order creation failed:', error);
            //const errorMessage = error.response?.data?.detail || error.message;
            //Alert.alert("Error", `주문 생성에 실패했습니다: ${errorMessage}`);
            if (error.response && error.response.status === 400) {
                Alert.alert("기부 생성 실패", `주문 생성에 실패했습니다/상대 혹은 당신의 주소가 유효하지 않습니다.`);
                
                // 필요한 경우 여기에 로그를 남기거나 상태를 업데이트할 수 있습니다.
                console.log('400 Method Not Allowed - The method is not supported for the requested URL.');
              }
            
        }
    };

    const handleCheckAddress = async () => {
        try {
            const response = await axios.get(`${apiUrl}/check-address/${basicAddress}`);
            setIsAddressValid(response.data === 'Valid');
            if (response.data) {
                Alert.alert("주소 확인", "유효한 주소입니다.");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert("오류", "주소 확인에 실패했습니다.");
                // 필요한 경우 여기에 로그를 남기거나 상태를 업데이트할 수 있습니다.
                console.log('400 Method Not Allowed - The method is not supported for the requested URL.');
                
              }
            //console.error('주소 확인 실패:', error);
            
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>상품 사이즈</Text>
            <Picker
                selectedValue={productSize}
                style={styles.picker}
                onValueChange={setProductSize}>
                <Picker.Item label="XS" value="XS" />
                <Picker.Item label="S" value="S" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="L" value="L" />
            </Picker>
            <Text style={styles.label}>기본 주소</Text>
            <TextInput
                style={styles.input}
                onChangeText={setBasicAddress}
                value={basicAddress}
                placeholder="기본 주소 입력"
            />
            <TouchableOpacity style={styles.checkAddressButton} onPress={handleCheckAddress}>
                <Text style={styles.checkAddressButtonText}>주소 확인</Text>
            </TouchableOpacity>
            <Text style={styles.label}>상세 주소</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDetailAddress}
                value={detailAddress}
                placeholder="상세 주소 입력"
            />
            <TouchableOpacity style={styles.priceCheckButton} onPress={handlePriceCheck}>
                <Text style={styles.priceCheckButtonText}>가격 조회</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderButton} onPress={handleCreateOrder}>
                <Text style={styles.orderButtonText}>주문하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333',
    },
    picker: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    checkAddressButton: {
        marginTop: 10,
        paddingVertical: 15,
        backgroundColor: '#4caf50',
        borderRadius: 10,
        alignItems: 'center',
    },
    checkAddressButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceCheckButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#f1c40f',
        borderRadius: 10,
        alignItems: 'center',
    },
    priceCheckButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

// 푸시 알림 전송 함수
async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  // 푸시 알림을 위한 등록 함수
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      // 안드로이드 푸시 알림 채널 설정
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    // 디바이스에서 푸시 알림 권한 요청
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  
    return token; // 푸시 토큰 반환
  }