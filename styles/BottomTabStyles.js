import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default StyleSheet.create({
  defaultTabBar: {
    height: 60,
    justifyContent: "center",
    paddingBottom: 5,
  },
  addPostWrapper: {
    alignSelf: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addPostIcon: {
    color: "#FFFFFF",
    fontSize: 24,
  },
});
