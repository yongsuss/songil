//게시글 작성 페이지
/*
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // 아이콘 사용을 위한 임포트

function FundBoardMake({ navigation }) {
    const { apiUrl, azureUrl, boardToken, id, address } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUris, setImageUris] = useState([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
            allowsEditing: false,
        });

        if (!result.cancelled) {
            setImageUris([...imageUris, ...result.assets.map(asset => asset.uri)]);
        }
    };

    const uploadImage = async (uri) => {
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            type: 'image/jpeg',  // 이미지 타입에 맞게 설정하세요
            name: 'upload.jpg',
        });
    
        try {
            // URL 및 토큰 사용에 주의하세요, 필요하면 수정하세요
            const response = await axios.post(`${azureUrl}?token=${boardToken}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                return response.data.url;  // 응답에서 URL을 정확히 반환하는지 확인하세요
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        if (imageUris.length === 0) {
            alert('Please upload at least one image.');
            return;
        }

        try {
            const imageUrls = await Promise.all(imageUris.map(uri => uploadImage(uri)));

            const postData = {
                id,
                region: address,
                category: 0,
                public: true,
                title,
                text,
                images: imageUrls,
            };

            const response = await fetch(`${apiUrl}/board/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                alert('Post created successfully!');
                navigation.goBack();
            } else {
                alert('Failed to create post.');
            }
        } catch (error) {
            alert('An error occurred while creating the post: ' + error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title (max 30 chars)"
                value={title}
                onChangeText={setTitle}
                maxLength={30}
            />
            <TextInput
                style={styles.input}
                placeholder="Content (max 1000 chars)"
                value={text}
                onChangeText={setText}
                maxLength={1000}
                multiline
            />
            <TextInput
                style={styles.input}
                editable={false}
                value={address}
            />
            <View style={styles.imageContainer}>
                {imageUris.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.image} />
                ))}
                <TouchableOpacity onPress={pickImage} style={styles.addButton}>
                    <Icon name="plus-square" size={50} color="#007AFF" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Create Post</Text>
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
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    addButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 5,
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
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';

function FundBoardMake({ navigation }) {
    const { apiUrl, boardToken, id, address } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [region, setRegion] = useState('');
    const [item, setItem] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async () => {
        const postData = {
            id: id, // 실제 사용자 ID 등으로 변경할 것
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

export default FundBoardMake;
