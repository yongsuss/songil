import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import axios from 'axios';

const AllFundMake = () => {
    const [formData, setFormData] = useState({
        category: 0,
        amount: '',
        current: 0,
        enddate: '',
        title: '',
        text: '',
        count: 0,
        prove: true,
        image: ''
    });
    const [duration, setDuration] = useState('');

    const handleInputChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDurationChange = (selectedDuration) => {
        setDuration(selectedDuration);
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + parseInt(selectedDuration));
        handleInputChange('enddate', endDate.toISOString().split('T')[0]);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://your-api-url.com/fundraisings/add/', formData);
            Alert.alert('Success', 'Fundraising created successfully!');
            console.log(response.data); // For debugging
        } catch (error) {
            console.error('Failed to create fundraising:', error);
            Alert.alert('Error', 'Failed to create fundraising.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Fundraising</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={value => handleInputChange('title', value)}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Text"
                multiline
                numberOfLines={4}
                onChangeText={value => handleInputChange('text', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount (원)"
                keyboardType='numeric'
                onChangeText={value => handleInputChange('amount', value + '원')}
            />
            <Picker
                selectedValue={duration}
                style={styles.picker}
                onValueChange={handleDurationChange}>
                <Picker.Item label="7 days" value="7" />
                <Picker.Item label="14 days" value="14" />
                <Picker.Item label="30 days" value="30" />
                <Picker.Item label="90 days" value="90" />
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                onChangeText={value => handleInputChange('image', value)}
            />
            <Button title="Create Fundraising" onPress={handleSubmit} color="#a0a0a0" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc'
    },
    textArea: {
        height: 100 // Increased height for text input
    },
    picker: {
        width: '100%',
        height: 50,
        marginBottom: 10
    }
});

export default AllFundMake;
