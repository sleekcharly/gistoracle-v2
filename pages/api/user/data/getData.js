import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { db } from "../../../../utils/firebase/admin";

const handler = nc();
handler.use(FBAuth);

handler.get(async (req, res) => {
  // define empty user data object
  let userData = {};

  await db
    .collection("users")
    .where("userId", "==", req.user.uid)
    .limit(1)
    .get()
    .then((data) => {
      if (data) {
        userData.credentials = data.docs[0].data();
        return db
          .collection("postLikes")
          .where("username", "==", req.user.username)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection("savedPosts")
        .where("username", "==", req.user.username)
        .get();
    })
    .then((data) => {
      userData.savedPosts = [];
      data.forEach((doc) => {
        userData.savedPosts.push(doc.data());
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

export default handler;
