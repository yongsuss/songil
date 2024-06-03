//게시글 
/*
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';

function Bulletin({ route, navigation }) {
    const { id, nickname } = useContext(AppContext);  // AppContext에서 사용자 ID 가져옴
    const { board } = route.params;
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        fetch(`http://20.39.190.194/comments/${board.board_id}`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    };

    const handleAddComment = () => {
        if (!commentText.trim()) {
            alert("Comment cannot be empty.");
            return;
        }
        const payload = {
            text: commentText,
            user_id: id,
            board_id: board.board_id
        };
        fetch('http://20.39.190.194/comments/add/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            setComments([...comments, data]);
            setCommentText('');
        })
        .catch(error => console.error('Error adding comment:', error));
    };

    const handleDeleteComment = (comment) => {
        if (id !== comment.user_id) {
            alert("You can only delete your own comments.");
            return;
        }
        fetch(`http://20.39.190.194/comments/delete/${comment.id}`, {
            method: 'DELETE'
        })
        .then(() => fetchComments())
        .catch(error => console.error('Error deleting comment:', error));
    };
    const handleEditComment = (comment) => {
        if (id !== comment.user_id) {
            alert("You can only edit your own comments.");
            return;
        }
        setEditingCommentId(comment.id);
        setCommentText(comment.text);
    };

    const handleUpdateComment = () => {
        fetch(`http://20.39.190.194/comments/${editingCommentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: commentText })
        })
        .then(() => {
            setEditingCommentId(null);
            setCommentText('');
            fetchComments();
        })
        .catch(error => console.error('Error updating comment:', error));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{board.title}</Text>
            <Text style={styles.content}>{board.text}</Text>

            <TextInput
                style={styles.input}
                placeholder="Write a comment..."
                value={commentText}
                onChangeText={setCommentText}
            />
            {editingCommentId ? (
                <View style={styles.buttonContainer}>
                    <Button title="Update Comment" onPress={handleUpdateComment} />
                    <Button title="Cancel" onPress={() => {
                        setEditingCommentId(null);
                        setCommentText('');
                    }} />
                </View>
            ) : (
                <Button title="Add Comment" onPress={handleAddComment} />
            )}

            {comments.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <View style={styles.commentActions}>
                        {comment.user_id === id && (
                            <>
                                <TouchableOpacity onPress={() => handleEditComment(comment)}>
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteComment(comment)}>
    <Text style={styles.actionText}>Delete</Text>
</TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    content: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    input: {
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    comment: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    commentText: {
        fontSize: 14,
        marginBottom: 5
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    actionText: {
        marginLeft: 10,
        color: '#007bff'
    }
});


export default Bulletin;*/

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AppContext } from '../AppContext';

function Bulletin({ route, navigation }) {
    const { id, nickname } = useContext(AppContext);
    const { board } = route.params;
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const test = () => {
        navigation.navigate('DeliveryScreen');
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        fetch(`http://20.39.190.194/comments/${board.board_id}`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    };

    const handleAddComment = () => {
        if (!commentText.trim()) {
            Alert.alert("Error", "Comment cannot be empty.");
            return;
        }
        const payload = {
            text: commentText,
            user_id: id,
            board_id: board.board_id
        };
        fetch('http://20.39.190.194/comments/add/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            setComments([...comments, data]);
            setCommentText('');
        })
        .catch(error => console.error('Error adding comment:', error));
    };

    const handleDeleteComment = (comment) => {
        if (id !== comment.user_id) {
            Alert.alert("Error", "You can only delete your own comments.");
            return;
        }
        fetch(`http://20.39.190.194/comments/delete/${comment.id}`, {
            method: 'DELETE'
        })
        .then(() => fetchComments())
        .catch(error => console.error('Error deleting comment:', error));
    };

    const handleEditComment = (comment) => {
        if (id !== comment.user_id) {
            Alert.alert("Error", "You can only edit your own comments.");
            return;
        }
        setEditingCommentId(comment.id);
        setCommentText(comment.text);
    };

    const handleUpdateComment = () => {
        fetch(`http://20.39.190.194/comments/${editingCommentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: commentText })
        })
        .then(() => {
            setEditingCommentId(null);
            setCommentText('');
            fetchComments();
        })
        .catch(error => console.error('Error updating comment:', error));
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
                <Text style={styles.title}>{board.title}</Text>
                <Text style={styles.content}>{board.text}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChangeText={setCommentText}
                />
                {editingCommentId ? (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdateComment}>
                            <Text style={styles.buttonText}>Update Comment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            setEditingCommentId(null);
                            setCommentText('');
                        }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                        <Text style={styles.buttonText}>Add Comment</Text>
                    </TouchableOpacity>
                )}
                {comments.map((comment) => (
                    <View key={comment.id} style={styles.comment}>
                        <Text style={styles.commentText}>{comment.text}</Text>
                        {comment.user_id === id && (
                            <View style={styles.commentActions}>
                                <TouchableOpacity onPress={() => handleEditComment(comment)}>
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteComment(comment)}>
                                    <Text style={styles.actionText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.button} onPress={test}>
    <Text style={styles.menuText}>기부하기</Text>
</TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    content: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
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
        fontSize: 16
    },
    comment: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    commentText: {
        fontSize: 14,
        marginBottom: 5
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    actionText: {
        marginLeft: 10,
        color: '#007bff'
    }
});

export default Bulletin;
