import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 83,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16, // Відступи з боків
    paddingVertical: 16, // Відступи зверху та знизу
    marginTop: 16, // Щоб віддалити від хедера
  },
  avatarWrapper: {
    marginRight: 12, // Відступ між аватаром і текстом
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  postCard: {
    width: "100%",
    maxWidth: 343,
    height: 300,
    display: "flex",
    gap: 8,
    marginBottom: 32,
  },
  imgWrapper: {
    width: 343,
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: 240,
    objectFit: "cover",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  postDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feedback: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
  },
  feedbackItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  feedbackText: {
    fontSize: 16,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#212121",
  },
});
