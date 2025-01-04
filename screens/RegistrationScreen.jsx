import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage, getImageUrl, removeImage } from "../utils/storage";
import { registerDB } from "../utils/auth";
import BgImg from "../assets/images/bg-img.jpg";
import AddIcon from "../assets/images/add.png";
import InputField from "../components/InputField";
import styles from "../styles/RegistrationScreenStyles";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPath, setAvatarPath] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleImageUpload = async (file, fileName) => {
    try {
      const imageRef = await uploadImage(
        "user_avatars",
        "temp",
        file,
        fileName
      );
      setAvatarPath(imageRef);
      const imageUrl = await getImageUrl(imageRef);

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image and getting URL:", error);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      const response = await fetch(uri);

      const file = await response.blob();

      const fileName = uri.split("/").pop() || "123";
      const fileType = file.type;

      const avatarFile = new File([file], fileName, { type: fileType });

      const imageUrl = await handleImageUpload(avatarFile, fileName);
      setAvatarUrl(imageUrl);
    }
  };

  const removeAvatar = async () => {
    const result = await removeImage(avatarPath);

    if (result) {
      setAvatarUrl("");
      setAvatarPath("");
    }
  };

  function handleSubmit() {
    const credentials = {
      avatar: avatarPath,
      login,
      email,
      password,
    };
    registerDB(credentials);
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatarUrl("");
    setAvatarPath("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            source={BgImg}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.contentContainer}>
              <View style={styles.avatarWrapper}>
                {avatarUrl && (
                  <Image source={{ uri: avatarUrl }} style={styles.avatarImg} />
                )}
              </View>
              <TouchableOpacity onPress={pickImage}>
                <Image source={AddIcon} style={styles.addBtn} />
              </TouchableOpacity>

              <Text style={styles.formTitle}>Реєстрація</Text>
              <View style={{ gap: 16 }}>
                <InputField
                  value={login}
                  onChangeText={setLogin}
                  placeholder="Логін"
                  isFocused={focusedField === "login"}
                  onFocus={() => setFocusedField("login")}
                  onBlur={() => setFocusedField(null)}
                />
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Адреса електронної пошти"
                  isFocused={focusedField === "email"}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
                <View style={styles.inputWrapper}>
                  <InputField
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Пароль"
                    secureTextEntry={!isShown}
                    isFocused={focusedField === "password"}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Pressable
                    onPress={() => setIsShown(!isShown)}
                    style={styles.inputPassLab}
                  >
                    <Text style={styles.inputPassLabText}>
                      {isShown ? "Приховати" : "Показати"}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Pressable style={styles.formBtn} onPress={handleSubmit}>
                <Text style={styles.formBtnText}>Зареєструватися</Text>
              </Pressable>
              <View style={styles.formTextWrapper}>
                <Text style={styles.formText}>Вже є акаунт?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.linkText}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
