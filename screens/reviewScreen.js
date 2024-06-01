import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView } from 'react-native';

export default function ReviewScreen() {
  const [nickname, setNickname] = useState('');
  const [donorNickname, setDonorNickname] = useState('');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = () => {
    // 작성 버튼 눌렀을 때 처리 로직
    console.log({
      nickname,
      donorNickname,
      content,
      isPrivate
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
        />
        <Text style={styles.label}>기부자 닉네임</Text>
        <TextInput
          style={styles.input}
          value={donorNickname}
          onChangeText={setDonorNickname}
        />
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          multiline={true}
          numberOfLines={4}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>공개</Text>
          <Switch
            value={!isPrivate}
            onValueChange={() => setIsPrivate(previousState => !previousState)}
          />
        </View>
      </ScrollView>
      <Button title="작성" onPress={handleSubmit} style={styles.submitButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  submitButton: {
    marginTop: 20
  }
});
