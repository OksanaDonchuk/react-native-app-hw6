import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginDB } from "../utils/auth";
import BgImg from "../assets/images/bg-img.jpg";
import InputField from "../components/InputField";
import styles from "../styles/LoginScreenStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const dispatch = useDispatch();
  console.log(navigation);

  function handleSubmit() {
    loginDB({ email, password }, dispatch);
    setEmail("");
    setPassword("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground source={BgImg} resizeMode="cover" style={styles.image}>
          <View style={styles.contentContainer}>
            <Text style={styles.formTitle}>Увійти</Text>
            <View style={{ gap: 16 }}>
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
                  placeholder="●●●●●●●●●●●●"
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
              <Text style={styles.formBtnText}>Увійти</Text>
            </Pressable>
            <View style={styles.formTextWrapper}>
              <Text style={styles.formText}>Ще немає акаунту?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.linkText}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
