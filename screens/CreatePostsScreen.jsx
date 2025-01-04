import React from "react";
import { View } from "react-native";
import CreatePost from "../components/CreatePost";
import styles from "../styles/CreatePostsStyles";
import { MaterialIcons } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CreatePost navigation={navigation} />
      <View style={styles.iconWrapper}>
        <MaterialIcons name="delete" size={24} color="#BDBDBD" />
      </View>
    </View>
  );
};

export default CreatePostsScreen;
