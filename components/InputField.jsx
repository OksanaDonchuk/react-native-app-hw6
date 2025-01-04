import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  onFocus,
  onBlur,
  isFocused,
  style,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[styles.input, isFocused && styles.focused, style]}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  focused: {
    borderColor: "#FF6C00",
  },
});
