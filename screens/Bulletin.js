//게시글 

/*

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, Image, Pressable } from 'react-native';
import { AppContext } from '../AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Bulletin({ route, navigation }) {
    const { id, nickname, azureUrl } = useContext(AppContext);
    const { board } = route.params;
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const navigateToDeliveryScreen = () => {
        navigation.navigate('DeliveryScreen', {
            weakId: board.id,
            boardId: board.board_id
        });
    };

    useEffect(() => {
        fetchComments();
        console.log(board.image);
    }, []);

    const fetchComments = () => {
        fetch(`http://20.39.190.194/comments/${board.board_id}`)
            .then(response => response.json())
            .then(data => {
                setComments(data.map(item => ({
                    ...item.comment,
                    nickname: item.nickname,
                    postedAt: formatTimeElapsed(item.comment.day)
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
            const now = new Date().toISOString(); // 현재 시간을 ISO 문자열로 변환
            setComments([{...data, nickname: nickname, postedAt: formatTimeElapsed(now)}, ...comments]); // 댓글 목록에 즉시 추가
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

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedImage(null);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{board.title}</Text>
            <Text style={styles.content}>닉네임: {board.nickname}</Text>
            <Text style={styles.content}>필요한 물품: {board.item}</Text>
            <Text style={styles.content}>내용: {board.text}</Text>
            {board.image && (
                <TouchableOpacity onPress={() => handleImagePress(azureUrl + '/board/' + board.image)}>
                    <Image source={{ uri: azureUrl + '/board/' + board.image }} style={styles.boardImage} />
                </TouchableOpacity>
            )}
            <View style={styles.inputContainer}>
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
                    <Text style={styles.buttonText}>댓글 달기</Text>
                </TouchableOpacity>
            )}
            </View>
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
            
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <Pressable style={styles.modalContainer} onPress={closeModal}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
                        )}
                    </Pressable>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', // 중앙 정렬
        color: '#333',
        textShadowColor: '#aaa', // 텍스트 그림자 색상
        textShadowOffset: { width: 1, height: 1 }, // 텍스트 그림자 오프셋
        textShadowRadius: 3, // 텍스트 그림자 반경
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 18,
        color: '#666',
        marginLeft: 5,
    },
    content: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 22, // 텍스트 줄 간격
        textAlign: 'justify', // 양쪽 정렬
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 15,  // 상하 패딩
        borderRadius: 10,
        fontSize: 16,
        marginRight: 8,  // 버튼과의 간격
        height: 50,
    },
    
    addButton: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#a0a0a0',
        borderRadius: 10,
        height: 50,
        marginTop: 10,  // 버튼을 아래로 조금 이동
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
    },
    boardImage: {
        width: '100%', // Make image full width
        height: 200, // Set fixed height, or adjust as needed
        resizeMode: 'cover', // Ensure the image covers the entire area
        marginTop: 20,
        marginBottom: 20,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // 반투명한 검은 배경
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%', // 이미지 컨테이너 너비
        height: '80%', // 이미지 컨테이너 높이
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullscreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // 이미지를 비율에 맞춰 화면에 맞게 조정
    },
    donateButton: {
        backgroundColor: '#ff6f61',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    donateButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default Bulletin;*/

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, Image, Pressable } from 'react-native';
import { AppContext } from '../AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Bulletin({ route, navigation }) {
    const { id, nickname, azureUrl } = useContext(AppContext);
    const { board, selectedImage } = route.params;
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    useEffect(() => {
        fetchComments();
        console.log(board.image);
    }, []);

    const fetchComments = () => {
        fetch(`http://20.39.190.194/comments/${board.board_id}`)
            .then(response => response.json())
            .then(data => {
                setComments(data.map(item => ({
                    ...item.comment,
                    nickname: item.nickname,
                    postedAt: formatTimeElapsed(item.comment.day)
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
            const now = new Date().toISOString(); // 현재 시간을 ISO 문자열로 변환
            setComments([{...data, nickname: nickname, postedAt: formatTimeElapsed(now)}, ...comments]); // 댓글 목록에 즉시 추가
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

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedImage(null);
    };

    const isOwner = id === board.id; // 게시글 소유자인지 확인

    const navigateToDeliveryScreen = () => {
        if (isOwner) {
            Alert.alert("알림", "자신의 게시글에는 기부할 수 없습니다.");
        } else {
            navigation.navigate('DeliveryScreen', {
                weakId: board.id,
                boardId: board.board_id
            });
        }
    };
    const navigateReviewMakeScreen = () => {
        navigation.navigate('ReviewMakeScreen', {
            weakId: board.id,
            boardId: board.board_id
        });
        //navigation.navigate('ReviewMakeScreen');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{board.title}</Text>
            <Text style={styles.content}>닉네임: {board.nickname}</Text>
            <Text style={styles.content}>필요한 물품: {board.item}</Text>
            <Text style={styles.content}>-내용-: {board.text}</Text>
            {board.image && (
                <TouchableOpacity onPress={() => handleImagePress(azureUrl + '/board/' + board.image)}>
                    <Image source={{ uri: azureUrl + '/board/' + board.image }} style={styles.boardImage} />
                </TouchableOpacity>
            )}
            <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        placeholder="댓글을 작성하세요..."
        value={commentText}
        onChangeText={setCommentText}
    />
            {editingCommentId ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdateComment} disabled={isOwner}> // 게시글 소유자는 기부 버튼 비활성화
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
                    <Text style={styles.buttonText}>댓글 달기</Text>
                </TouchableOpacity>
            )}
            </View>
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
            {isOwner && (
            <TouchableOpacity style={styles.donateButton} onPress={navigateReviewMakeScreen}>
                <Text style={styles.donateButtonText}>리뷰 작성</Text>
            </TouchableOpacity>
        )}
            
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <Pressable style={styles.modalContainer} onPress={closeModal}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
                        )}
                    </Pressable>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', // 중앙 정렬
        color: '#333',
        textShadowColor: '#aaa', // 텍스트 그림자 색상
        textShadowOffset: { width: 1, height: 1 }, // 텍스트 그림자 오프셋
        textShadowRadius: 3, // 텍스트 그림자 반경
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 18,
        color: '#666',
        marginLeft: 5,
    },
    content: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 22, // 텍스트 줄 간격
        textAlign: 'justify', // 양쪽 정렬
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 15,  // 상하 패딩
        borderRadius: 10,
        fontSize: 16,
        marginRight: 8,  // 버튼과의 간격
        height: 50,
    },
    
    addButton: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#a0a0a0',
        borderRadius: 10,
        height: 50,
        marginTop: 10,  // 버튼을 아래로 조금 이동
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
    },
    boardImage: {
        width: '100%', // Make image full width
        height: 200, // Set fixed height, or adjust as needed
        resizeMode: 'cover', // Ensure the image covers the entire area
        marginTop: 20,
        marginBottom: 20,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // 반투명한 검은 배경
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%', // 이미지 컨테이너 너비
        height: '80%', // 이미지 컨테이너 높이
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullscreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // 이미지를 비율에 맞춰 화면에 맞게 조정
    },
    donateButton: {
        backgroundColor: '#ff6f61',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    donateButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default Bulletin;