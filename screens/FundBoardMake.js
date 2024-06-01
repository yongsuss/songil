//게시글 작성 페이지
/*

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';

function FundBoardMake({ navigation }) {
    const { apiUrl, boardToken, id, address, nickname } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [region, setRegion] = useState('');
    const [item, setItem] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async () => {
        const postData = {
            id: id, // 실제 사용자 ID 등으로 변경할 것
            nickname: nickname,
            region: address,
            category: 0, // 카테고리 번호, 필요에 따라 조정
            public: true,
            title,
            text,
            item,
            image
        };

        try {
            const response = await fetch(`${apiUrl}/board/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${boardToken}` // 필요한 토큰 인증 방식에 맞게 변경
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                alert('게시글이 성공적으로 생성되었습니다!');
                navigation.goBack(); // 게시글 작성 후 이전 화면으로 돌아가기
            } else {
                const errorData = await response.json();
                alert('게시글 생성 실패: ' + errorData.detail);
            }
        } catch (error) {
            alert('게시글 생성 중 오류 발생: ' + error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="제목 (최대 30자)"
                value={title}
                onChangeText={setTitle}
                maxLength={30}
            />
            <TextInput
                style={styles.input}
                placeholder="내용 (최대 1000자)"
                value={text}
                onChangeText={setText}
                maxLength={1000}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="항목"
                value={item}
                onChangeText={setItem}
            />
            <TextInput
                style={styles.input}
                placeholder="이미지 URL"
                value={image}
                onChangeText={setImage}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>게시글 생성</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default FundBoardMake;*/

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AppContext } from '../AppContext';

function FundBoardMake({ navigation }) {
    const { apiUrl, boardToken, id, address, nickname } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [item, setItem] = useState('');
    const [image, setImage] = useState('');

    const validateFields = () => {
        // 이미지 필드를 제외한 모든 필드 검사
        if (!title.trim() || !text.trim() || !item.trim()) {
            Alert.alert("오류", "제목, 내용 및 필요한 물품은 필수 입력 사항입니다.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        const postData = {
            id,
            nickname,
            region: address,
            category: 0,
            public: true,
            title,
            text,
            item,
            image
        };

        try {
            const response = await fetch(`${apiUrl}/board/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${boardToken}`
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                Alert.alert("성공", "게시글이 성공적으로 생성되었습니다!");
                navigation.goBack();
            } else {
                const errorData = await response.json();
                Alert.alert("생성 실패", errorData.detail);
            }
        } catch (error) {
            Alert.alert("오류", "게시글 생성 중 오류 발생: " + error.message);
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
                    maxLength={30}
                />
                <TextInput
                    style={styles.input}
                    placeholder="필요한 물품"
                    value={item}
                    onChangeText={setItem}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="내용"
                    value={text}
                    onChangeText={setText}
                    maxLength={1000}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="이미지 URL (선택 사항)"
                    value={image}
                    onChangeText={setImage}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>게시글 생성</Text>
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
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    textArea: {
        backgroundColor: '#ffffff',
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: 300,
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

export default FundBoardMake;
