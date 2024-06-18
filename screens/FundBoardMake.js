//게시글 작성 페이지
/*

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

export default FundBoardMake;*/

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AppContext } from '../AppContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function FundBoardMake({ navigation }) {
    const { apiUrl, boardToken, id, address, azureUrl } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [item, setItem] = useState('');
    const [boardImageFile, setBoardImageFile] = useState('');//사진이름
    const [boardImageFileUri, setBoardImageFileUri] = useState('');//실제 사진 저장경로
    const [category, setCategory] = useState(0); // Default category

    useEffect(() => {
        fetch(`${apiUrl}/weakusers/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${boardToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const user = data.find(u => u.id === id);
            if (user) {
                setCategory(user.category); // Set the category if user is found
            }
        })
        .catch(error => {
            Alert.alert("오류", "사용자 정보 로드 중 오류 발생: " + error.message);
        });
    }, []);

    const validateFields = () => {
        if (!title.trim() || !text.trim() || !item.trim()) {
            Alert.alert("오류", "제목, 내용 및 필요한 물품은 필수 입력 사항입니다.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {//게시글 생성
        if (!title.trim() || !text.trim() || !item.trim() || !boardImageFileUri) {
            Alert.alert("오류", "제목, 내용, 필요한 물품, 그리고 이미지는 필수 입력 사항입니다.");
            return false;
        }

        if(boardImageFileUri){
        try {//Azure Storage에 올리기
            const fileContent = await FileSystem.readAsStringAsync(boardImageFileUri, { encoding: FileSystem.EncodingType.Base64 });
            const fileArrayBuffer = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
            await axios.put(`${azureUrl}/board/${boardImageFile}?${boardToken}`, fileArrayBuffer, {
              headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': 'image/jpeg'
              }
            });
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }

        /*게시판 올리기*/
        const postData = {
            id: id,
            region: address,
            category: category,
            public: true,
            title: title,
            text: text,
            item: item,
            image: boardImageFile
        };

        console.log(postData);

        try{
        await axios.post(`${apiUrl}/board/create/`, postData)
            .then(response => {
                console.log('POST 요청 성공:', response.data);
                Alert.alert("성공", "게시글이 성공적으로 생성되었습니다!");
                navigation.goBack();
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    //console.error('POST 요청 실패:', error);
                    Alert.alert("생성 실패", "게시글 생성 실패");
                    // 필요한 경우 여기에 로그를 남기거나 상태를 업데이트할 수 있습니다.
                    console.log('422 Method Not Allowed - The method is not supported for the requested URL.');
                    
                  }
            
           // Alert.alert("생성 실패", "게시글 생성 실패");
            // 에러 처리
        });
    }
        catch (error) {
            Alert.alert("오류", "게시글 생성 중 오류 발생: " + error.message);
        }
        
    };

    const handleChoosePhoto = async () => {//파일에서 사진 선택
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();//파일 접근 권한
        if (permissionResult.granted === false) {
          alert("We need permission to access your photos!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
    
        if (!result.cancelled) {
          const fileUri = result.assets[0].uri;
          const fileName = fileUri.split('/').pop();
          setBoardImageFile(fileName);
          setBoardImageFileUri(fileUri);
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
                {boardImageFileUri && <Image source={{ uri : boardImageFileUri}} style={styles.Image}/>}
                <TouchableOpacity onPress={handleChoosePhoto} style={[styles.button, {marginBottom: 10}]}>
                    <Text style={styles.buttonText}>이미지 가져오기(선택)</Text>
                </TouchableOpacity>
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
    },
    Image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
      },
});

export default FundBoardMake;