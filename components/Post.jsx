import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import styles from "../styles/PostsScreenStyles";

const Post = ({ navigation, post }) => {
  return post ? (
    <View style={styles.postCard}>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: post.photoUrl }} style={styles.img} />
      </View>
      <Text style={styles.postTitle}>{post.name}</Text>
      <View style={styles.postDescription}>
        <View style={styles.feedback}>
          <TouchableOpacity
            style={styles.feedbackItem}
            onPress={() => navigation.navigate("Comments", { post })}
          >
            <Feather name="message-circle" size={24} color="#BDBDBD" />
            <Text style={styles.feedbackText}>{post.commentCount}</Text>
          </TouchableOpacity>
          <View style={styles.feedbackItem}>
            <MaterialIcons name="thumb-up" size={24} color="#FF6C00" />
            <Text style={styles.feedbackText}>153</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.location}
          onPress={() =>
            navigation.navigate("Map", { geoLocation: post.geoLocation })
          }
        >
          <MaterialIcons name="place" size={24} color="#212121" />
          <Text style={styles.locationText}>{post.locationName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Text> Немає нових постів</Text>
  );
};
export default Post;
