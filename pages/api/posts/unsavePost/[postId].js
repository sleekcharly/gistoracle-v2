import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { admin, db } from "../../../../utils/firebase/admin";

const handler = nc();
handler.use(FBAuth);

handler.get(async (req, res) => {
  // get saved posts collection from user collection
  const savedPostDocument = db
    .collection("savedPosts")
    .where("username", "==", req.user.username)
    .where("postId", "==", req.query.postId)
    .limit(1);

  // get user document
  const userRef = db.doc(`/users/${req.user.username}`);

  // get users collection
  // const usersRef = db.collection("users");

  // get postDocument from database
  const postDocument = db.doc(`/posts/${req.query.postId}`);

  let postData;

  // check to see if post exists before saving the post
  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return savedPostDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Post not saved" });
      } else {
        return db
          .doc(`/savedPosts/${data.docs[0].id}`)
          .delete()
          .then(() => {
            postData.saves--;
            return postDocument.update({
              saves: postData.saves,
              userId: req.user.uid,
            });
          })
          .then(() => {
            return userRef.update({
              savedPosts: admin.firestore.FieldValue.increment(-1),
              userId: req.user.uid,
            });
          })
          .then(() => {
            res.json(postData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

export default handler;
