import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 120,
    paddingHorizontal: 16,
    paddingTop: 140,
  },

  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
    zIndex: 10,
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 32,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  closeIconWrapper: {
    position: "absolute",
    right: -12,
    bottom: 10,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  userName: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#212121",
    marginBottom: 32,
  },
});
