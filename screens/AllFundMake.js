/*

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // 날짜 계산을 위해 moment.js 사용
import { AppContext } from '../AppContext';

function AllFundMake({ navigation }) {
    const { apiUrl, authToken, id } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [endDate, setEndDate] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/weakusers/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const weakUser = data.find(user => user.id === id);
            if (weakUser) {
                setCategory(weakUser.category);
            }
        })
        .catch(error => {
            Alert.alert("오류", "사용자 정보를 가져오는 중 오류 발생: " + error.message);
        });
    }, [apiUrl, authToken, id]);

    const validateFields = () => {
        if (!title.trim() || !amount.trim() || !endDate || !text.trim()) {
            Alert.alert("오류", "모든 필드는 필수로 입력해야 합니다.");
            return false;
        }
        if (isNaN(amount)) {
            Alert.alert("오류", "모금액은 숫자여야 합니다.");
            return false;
        }
        return true;
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowDatePicker(Platform.OS === 'ios');
        setStartDate(currentDate);
    
        // 사용자가 선택한 기간에 따라 종료 날짜 설정
        const periodDays = parseInt(endDate, 10) || 0; // 주의: endDate가 기간을 저장하는 변수가 아닌 경우 변수명을 변경해야 할 수 있습니다.
        const calculatedEndDate = moment(currentDate).add(periodDays, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        setEndDate(calculatedEndDate);
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        const formattedStartDate = moment(startDate).toISOString();
    const formattedEndDate = moment(endDate).toISOString();

        const fundraisingData = {
            title,
            amount: parseFloat(amount),
            startdate: formattedStartDate,
            enddate: formattedEndDate,
            text,
            image,
            current: 0,
            category,
            prove: false
        };

        try {
            const response = await fetch(`${apiUrl}/fundraisings/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(fundraisingData),
            });

            if (response.ok) {
                Alert.alert("성공", "모금 건의 완료");
                navigation.goBack();
            } else {
                const errorData = await response.json();
                const errors = errorData.detail.map(err => `${err.loc.join(" -> ")}: ${err.msg}`).join("\n");
                Alert.alert("생성 실패", errors);
            }
        } catch (error) {
            Alert.alert("오류", "모금 건의 중 오류 발생: " + error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="제목"
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={[styles.input, {flex: 1}]}
                        placeholder="모금액"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <Text style={styles.icon}>원</Text>
                </View>
                <View style={styles.inputWithPicker}>
                    <Text style={styles.pickerLabel}>기간 선택:</Text>
                    <Picker
                        selectedValue={endDate}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setEndDate(itemValue)}>
                        <Picker.Item label="7일" value="7" />
                        <Picker.Item label="14일" value="14" />
                        <Picker.Item label="30일" value="30" />
                        <Picker.Item label="90일" value="90" />
                    </Picker>
                </View>
                <TextInput
                    style={styles.textArea}
                    placeholder="내용"
                    value={text}
                    onChangeText={setText}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="이미지 URL"
                    value={image}
                    onChangeText={setImage}
                />
                {showDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
                    <Text style={styles.buttonText}>날짜 선택</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>모금 건의</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    form: {
        padding: 20
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 5
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        marginLeft: 10,
        fontSize: 16
    },
    pickerLabel: {
        fontSize: 16,
        marginRight: 10
    },
    inputWithPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    picker: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        fontSize: 16
    },
    textArea: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        height: 200,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#a0a0a0',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default AllFundMake;*/

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // 날짜 계산을 위해 moment.js 사용
import { AppContext } from '../AppContext';

function AllFundMake({ navigation }) {
    const { apiUrl, authToken, id } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('7'); // 기간을 문자열 대신 숫자로 초기화
    const [endDate, setEndDate] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/weakusers/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const weakUser = data.find(user => user.id === id);
            if (weakUser) {
                setCategory(weakUser.category);
            }
        })
        .catch(error => {
            Alert.alert("오류", "사용자 정보를 가져오는 중 오류 발생: " + error.message);
        });
    }, [apiUrl, authToken, id]);

    const validateFields = () => {
        if (!title.trim() || !amount.trim() || !endDate || !text.trim()) {
            Alert.alert("오류", "모든 필드는 필수로 입력해야 합니다.");
            return false;
        }
        if (isNaN(amount)) {
            Alert.alert("오류", "모금액은 숫자여야 합니다.");
            return false;
        }
        return true;
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowDatePicker(Platform.OS === 'ios');
        // 날짜 선택 시 정오로 시간 설정
        const dateWithNoon = moment(currentDate).hour(12).minute(0).second(0);
        setStartDate(dateWithNoon.toDate());
        // 날짜가 변경되면 종료 날짜도 다시 계산
        const calculatedEndDate = moment(dateWithNoon).add(parseInt(period), 'days').toDate();
        setEndDate(calculatedEndDate);
    };
    
    const handlePeriodChange = (itemValue) => {
        setPeriod(itemValue); // 선택한 기간을 저장
        const calculatedEndDate = moment(startDate).add(parseInt(itemValue, 10), 'days').toDate();
        setEndDate(calculatedEndDate);
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        
        
        const formattedStartDate = moment(startDate).toISOString();
        const formattedEndDate = moment(endDate).toISOString();

    
        const fundraisingData = {
            title,
            amount: parseFloat(amount),
            startdate: formattedStartDate,
            enddate: formattedEndDate,
            text,
            image,
            current: 0,
            category,
            prove: false
        };

        try {
            const response = await fetch(`${apiUrl}/fundraisings/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(fundraisingData),
            });

            if (response.ok) {
                Alert.alert("성공", "모금 건의 완료");
                navigation.goBack();
            } else {
                const errorData = await response.json();
                const errors = errorData.detail.map(err => `${err.loc.join(" -> ")}: ${err.msg}`).join("\n");
                Alert.alert("생성 실패", errors);
            }
        } catch (error) {
            Alert.alert("오류", "모금 건의 중 오류 발생: " + error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="제목"
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={[styles.input, {flex: 1}]}
                        placeholder="모금액"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <Text style={styles.icon}>원</Text>
                </View>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
                    <Text style={styles.buttonText}>시작 날짜 선택</Text>
                </TouchableOpacity>
                <View style={styles.inputWithPicker}>
                <Text style={styles.pickerLabel}>기간 선택:</Text>
                    <Picker
                        selectedValue={period} // 기간 선택에 사용
                        style={styles.picker}
                        onValueChange={handlePeriodChange}>
                        <Picker.Item label="7일" value="7" />
                        <Picker.Item label="14일" value="14" />
                        <Picker.Item label="30일" value="30" />
                        <Picker.Item label="90일" value="90" />
                    </Picker>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        시작일: {startDate ? moment (startDate).format('YYYY-MM-DD') : '   ~   '}
                    </Text>
                    <Text style={styles.dateText}>
                        종료일: {endDate ? moment(endDate).format('YYYY-MM-DD') : ''}
                    </Text>
                </View>
                <TextInput
                    style={styles.textArea}
                    placeholder="내용"
                    value={text}
                    onChangeText={setText}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="이미지 URL"
                    value={image}
                    onChangeText={setImage}
                />
                {showDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>모금 건의</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    form: {
        padding: 20
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 5
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        marginLeft: 10,
        fontSize: 16
    },
    pickerLabel: {
        fontSize: 16,
        marginRight: 10
    },
    inputWithPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        fontSize: 16
    },
    textArea: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        height: 200,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#a0a0a0',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    dateContainer: {
        flexDirection: 'row',       // 행 방향으로 배치
        justifyContent: 'space-between', // 양쪽 끝으로 정렬
        alignItems: 'center',       // 수직 가운데 정렬 (필요한 경우)
        paddingHorizontal: 10,      // 컨테이너의 좌우 여백 (필요한 경우)
        marginBottom: 5,
        padding: 15,
    },
    dateText: {
        fontSize: 16,
        // 여기에 추가적인 스타일을 정의할 수 있습니다.
    },

});

export default AllFundMake;

