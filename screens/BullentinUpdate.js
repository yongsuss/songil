// 게시글 수정화면
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';

const BulletinUpdate = ({ route, navigation }) => {
  const { post } = route.params;
  const { apiUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({ ...post });

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${apiUrl}/board/${post.board_id}`, formData);
      if (response.status === 200) {
        Alert.alert("업데이트 성공", "게시글이 성공적으로 업데이트되었습니다.");
        navigation.goBack(); // 성공 후 이전 화면으로 돌아감
      }
    } catch (error) {
      Alert.alert("업데이트 실패", "게시글 업데이트에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>제목:</Text>
      <TextInput style={styles.input} value={formData.title} onChangeText={(text) => setFormData({...formData, title: text})} />
      <Text style={styles.label}>내용:</Text>
      <TextInput style={styles.input} value={formData.text} onChangeText={(text) => setFormData({...formData, text: text})} multiline />
      <Button title="업데이트" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default BulletinUpdate;
