import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    height: 489,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  formTitle: {
    width: "100%",
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  inputWrapper: {
    position: "relative",
  },
  inputPassLab: {
    position: "absolute",
    bottom: 10,
    right: 0,
    paddingHorizontal: 16,
  },
  inputPassLabText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    gap: 16,
    marginBottom: 43,
  },
  formBtn: {
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 16,
    marginTop: 16,
  },
  formBtnText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  formTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  formText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});
