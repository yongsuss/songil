//게시글 

/*
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

    const navigateToDeliveryScreen = () => {
        navigation.navigate('DeliveryScreen', {
            weakId: board.id // `board.id`는 게시글의 ID가 제대로 설정되어 있는지 확인 필요
        });
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        fetch(`http://20.39.190.194/comments/${board.board_id}`)
            .then(response => response.json())
            .then(data => {
                setComments(data.map(comment => ({
                    ...comment,
                    postedAt: formatTimeElapsed(comment.created_at)
                })));
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    const formatTimeElapsed = (datetime) => {
        const timePosted = new Date(datetime);
        const now = new Date();
        const diffInSeconds = Math.floor((now - timePosted) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
    
        if (diffInSeconds < 60) {
            return `${diffInSeconds}초 전`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        } else if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        } else {
            return `${diffInDays}일 전`;
        }
    };

    const handleAddComment = () => {
        if (!commentText.trim()) {
            Alert.alert("오류", "댓글을 입력해주세요.");
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
            setComments([...comments, {...data, postedAt: formatTimeElapsed(data.created_at)}]);
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
            <Text style={styles.title}>{board.title}</Text>
            <Text style={styles.content}>닉네임: {board.nickname}</Text>
            <Text style={styles.content}>필요한 물품: {board.item}</Text>
            <Text style={styles.content}>{board.text}</Text>
            
            <TextInput
                style={styles.input}
                placeholder="댓글을 작성하세요..."
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
                    <Text style={styles.commentText}>{`${comment.user_id}: ${comment.text}`}</Text>
                    <Text style={styles.commentTime}>{comment.postedAt}</Text>
                    {comment.user_id === id && (
                        <View style={styles.commentActions}>
                            <TouchableOpacity onPress={() => handleEditComment(comment)}>
                                <Text style={styles.actionText}>수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteComment(comment)}>
                                <Text style={styles.actionText}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ))}
            <TouchableOpacity style={styles.donateButton} onPress={navigateToDeliveryScreen}>
                <Text style={styles.donateButtonText}>기부하기</Text>
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
        backgroundColor: '#a0a0a0',
    padding: 15,
    borderRadius: 10,
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
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    actionText: {
        marginLeft: 10,
        color: '#007bff'
    },
    commentTime: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'flex-end'
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

    const navigateToDeliveryScreen = () => {
        navigation.navigate('DeliveryScreen', {
            weakId: board.id // `board.id`는 게시글의 ID가 제대로 설정되어 있는지 확인 필요
        });
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        fetch(`http://20.39.190.194/comments/${board.board_id}`)
            .then(response => response.json())
            .then(data => {
                setComments(data.map(item => ({
                    ...item.comment, // comment 객체에서 필요한 정보를 추출
                    nickname: item.nickname, // 최상위 객체에서 nickname 추출
                    postedAt: formatTimeElapsed(item.comment.day) // 'day' 필드를 'created_at' 대신 사용
                })));
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    const formatTimeElapsed = (datetime) => {
        const timePosted = new Date(datetime);
        const now = new Date();
        const diffInSeconds = Math.floor((now - timePosted) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
    
        if (diffInSeconds < 60) {
            return `${diffInSeconds}초 전`;
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        } else if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        } else {
            return `${diffInDays}일 전`;
        }
    };

    const handleAddComment = () => {
        if (!commentText.trim()) {
            Alert.alert("오류", "댓글을 입력해주세요.");
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
            setComments([...comments, {...data, postedAt: formatTimeElapsed(data.created_at)}]);
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
            <Text style={styles.title}>{board.title}</Text>
            <Text style={styles.content}>닉네임: {board.nickname}</Text>
            <Text style={styles.content}>필요한 물품: {board.item}</Text>
            <Text style={styles.content}>{board.text}</Text>
            
            <TextInput
                style={styles.input}
                placeholder="댓글을 작성하세요..."
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
                    <Text style={styles.commentText}>{`${comment.nickname}: ${comment.text}`}</Text>
                    <Text style={styles.commentTime}>{comment.postedAt}</Text>
                    {comment.user_id === id && (
                        <View style={styles.commentActions}>
                            <TouchableOpacity onPress={() => handleEditComment(comment)}>
                                <Text style={styles.actionText}>수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteComment(comment)}>
                                <Text style={styles.actionText}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            ))}
            <TouchableOpacity style={styles.donateButton} onPress={navigateToDeliveryScreen}>
                <Text style={styles.donateButtonText}>기부하기</Text>
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
        backgroundColor: '#a0a0a0',
    padding: 15,
    borderRadius: 10,
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
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    actionText: {
        marginLeft: 10,
        color: '#007bff'
    },
    commentTime: {
        fontSize: 12,
        color: '#888',
        alignSelf: 'flex-end'
    }
});

export default Bulletin;
