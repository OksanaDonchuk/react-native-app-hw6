import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutDB } from "../utils/auth";
import { getUserPosts } from "../utils/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import PostList from "../components/PostList";
import BgImg from "../assets/images/bg-img.jpg";
import styles from "../styles/ProfileScreenStyles";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    } else {
      navigation.replace("Login");
    }
  }, []);

  async function fetchUserPosts() {
    try {
      const postsData = await getUserPosts(user.uid);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  if (!user) {
    return <ActivityIndicator size="large" color="#FF6C00" />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={BgImg} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.avatarWrapper}>
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.avatar} />
              ) : (
                <MaterialIcons
                  name="person"
                  size={120}
                  color="#BDBDBD"
                  style={styles.avatar}
                />
              )}
              <TouchableOpacity style={styles.closeIconWrapper}>
                <MaterialIcons name="close" size={18} color="#BDBDBD" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => logoutDB(dispatch)}
              style={styles.logoutBtn}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeIconWrapper}>
              <MaterialIcons name="close" size={18} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.userName}>{user.displayName}</Text>
            <PostList posts={posts} navigation={navigation} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
