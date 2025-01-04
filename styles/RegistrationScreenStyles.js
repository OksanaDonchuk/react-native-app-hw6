import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: "-38%" }],
    borderRadius: 16,
    zIndex: 2,
  },
  addBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12,
    zIndex: 3,
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
  formBtn: {
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 16,
    marginTop: 16,
  },
  formBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
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
