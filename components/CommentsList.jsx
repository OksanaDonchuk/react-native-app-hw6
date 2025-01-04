import React from "react";
import { View, Image, ScrollView, Text } from "react-native";
import { formatFirestoreDate } from "../utils/firestore";
import styles from "../styles/CommentsListStyle";

const Comment = ({ comment }) => {
  return (
    <View style={styles.commentCard}>
      <View style={styles.imgWrapperUser}>
        <Image
          source={{ uri: comment.author.photoURL }}
          style={styles.imgUser}
        />
      </View>
      <View style={styles.commentWrapper}>
        <Text style={styles.commentText}>{comment.content}</Text>
        <Text style={styles.commentDate}>
          {formatFirestoreDate(comment.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const UserComment = ({ comment }) => {
  return (
    <View style={styles.commentCard}>
      <View style={styles.commentWrapperRight}>
        <Text style={styles.commentText}>{comment.content}</Text>
        <Text style={styles.commentDateLeft}>
          {formatFirestoreDate(comment.createdAt)}
        </Text>
      </View>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: comment.author.photoURL }} style={styles.img} />
      </View>
    </View>
  );
};

const CommentsList = ({ comments, userPost }) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {comments?.map((comment, index) => {
        if (comment.author.id === userPost) {
          return <UserComment comment={comment} key={index} />;
        }
        return <Comment comment={comment} key={index} />;
      })}
    </ScrollView>
  );
};
export default CommentsList;
