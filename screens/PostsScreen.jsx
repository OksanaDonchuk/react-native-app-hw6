import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { getAllPosts } from "../utils/firestore";
import PostsList from "../components/PostList";
import styles from "../styles/PostsScreenStyles";

const PostsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const postsData = await getAllPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching post", error);
    }
  }

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.userName}>{user.displayName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
      )}
      {posts && <PostsList posts={posts} navigation={navigation} />}
    </View>
  );
};

export default PostsScreen;
