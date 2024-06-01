//게시글 
/*
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Bulletin({ route }) {
  const { board } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{board.title}</Text>
      <Text style={styles.nickname}>닉네임: {board.nickname || "익명"}</Text>
      <Text style={styles.item}>항목: {board.item || "정보 없음"}</Text>
      <Text style={styles.content}>{board.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  nickname: {
    fontSize: 18,
    marginBottom: 5
  },
  item: {
    fontSize: 16,
    marginBottom: 5
  },
  content: {
    fontSize: 14
  }
});

export default Bulletin;
*/
/*
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';

function Bulletin({ route, navigation }) {
    const { id } = useContext(AppContext); // 사용자 ID를 AppContext에서 가져옴
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
            .then(data => {
                console.log("Fetched comments:", data); // 로그를 통해 받아온 데이터 확인
                setComments(data);
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    const handleAddComment = () => {
        const payload = {
            text: commentText,
            user_id: id,  // AppContext에서 제공받은 사용자 ID 사용
            board_id: board.board_id
        };
        fetch('http://20.39.190.194/comments/add/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Added comment:", data); // 댓글 추가 후 받은 데이터 확인
            setComments([...comments, data]); // 직접 댓글 목록에 추가
            setCommentText('');
        })
        .catch(error => console.error('Error adding comment:', error));
    };

    const handleDeleteComment = (id) => {
        fetch(`http://20.39.190.194/comments/delete/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchComments())
        .catch(error => console.error('Error deleting comment:', error));
    };

    const handleEditComment = (id, text) => {
        setEditingCommentId(id);
        setCommentText(text);
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
                        <TouchableOpacity onPress={() => handleEditComment(comment.id, comment.text)}>
                            <Text style={styles.actionText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                            <Text style={styles.actionText}>Delete</Text>
                        </TouchableOpacity>
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


export default Bulletin;
