import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { CameraView, Camera } from "expo-camera";
import { Image } from "react-native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { uploadImage, getImageUrl } from "../utils/storage";
import { addPost } from "../utils/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/CreatePostsStyles";

const CreatePost = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  const isFormValid = name && locationName;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" &&
          locationStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted"
      );
    })();
  }, []);

  const handleImageUpload = async (file, fileName) => {
    try {
      const imageRef = await uploadImage("posts", user.uid, file, fileName);

      const imageUrl = await getImageUrl(imageRef);

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  const handleImageUrl = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const fileName = photo.split("/").pop() || "123";
    const fileType = file.type;

    const postFile = new File([file], fileName, { type: fileType });

    const imageUrl = await handleImageUpload(postFile, fileName);
    return imageUrl;
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photoData.uri);
      setPhoto(asset.uri);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("To continue, please allow access to your media library!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setPhoto(uri);
    }
  };

  const clearForm = () => {
    setPhoto(null);
    setName("");
    setLocationName("");
  };

  const handlePublish = async () => {
    const photoUrl = await handleImageUrl();
    const location = await Location.getCurrentPositionAsync({});
    setGeoLocation(location.coords);
    const post = {
      photoUrl,
      name,
      locationName,
      geoLocation: location.coords,
    };
    addPost(user.uid, post);
    clearForm();
    navigation.navigate("Posts");
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Permission request...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>Camera or location access is denied.</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imageContainer}>
            <CameraView
              style={styles.imageWrapper}
              ref={(ref) => setCameraRef(ref)}
            >
              <Image source={{ uri: photo }} style={styles.img} />

              <TouchableOpacity style={styles.iconWrapper} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </CameraView>
            <Text style={styles.inputText}>Upload a photo</Text>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Назва..."
              autoComplete="off"
              autoCapitalize="none"
              style={styles.commonInput}
            />
            <View style={styles.locationWrapper}>
              <MaterialIcons
                name="location-on"
                size={24}
                style={styles.locationIcon}
              />
              <TextInput
                value={locationName}
                onChangeText={setLocationName}
                placeholder="Місцевість..."
                autoComplete="off"
                autoCapitalize="none"
                style={[styles.commonInput, styles.locationInput]}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: isFormValid ? "#FF6C00" : "#F6F6F6",
              },
            ]}
            onPress={isFormValid ? handlePublish : null}
            disabled={!isFormValid}
          >
            <Text
              style={{
                color: isFormValid ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePost;
