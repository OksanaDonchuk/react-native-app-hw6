import React, { useState, useEffect } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { getCommentsForPost, addCommentToPost } from "../utils/firestore";
import CommentsList from "../components/CommentsList";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/CommentsListStyle";
const CommentsScreen = ({ route }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState("");
  const post = route.params?.post;

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const postsComments = await getCommentsForPost(post.id);
      setComments(postsComments);
    } catch (error) {
      console.error("Error fetching posts comments:", error);
    }
  }

  async function addComment() {
    try {
      const commentId = await addCommentToPost(post.id, user.uid, newComment);
      return commentId;
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }

  const handleSubmit = () => {
    addComment();
    setNewComment("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: post.photoUrl }} style={styles.img} />
      </View>
      {comments && (
        <CommentsList comments={comments} postAuthor={post.userId} />
      )}
      <View style={styles.commentContainer}>
        <TextInput
          multiline
          placeholder="Коментувати..."
          onChangeText={setNewComment}
          value={newComment}
        />
        <TouchableOpacity style={styles.iconWrapper} onPress={handleSubmit}>
          <MaterialIcons name="arrow-upward" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CommentsScreen;
