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

  // get postDocument
  const postDocument = db.doc(`/posts/${req.query.postId}`);

  //get user document
  const userRef = db.doc(`/users/${req.user.username}`);

  // get users collection
  // const usersRef = db.collection("users");

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
        return db
          .collection("savedPosts")
          .add({
            postId: req.query.postId,
            username: req.user.username,
          })
          .then(() => {
            // check to see if a saves field exists
            postData.saves ? postData.saves++ : (postData.saves = 1);

            // check to see if a saves field exist in the document and then update the post document in cloud
            return postDocument.set({ saves: postData.saves }, { merge: true });
          })
          .then(() => {
            // increment savedPosts field in user database
            return userRef.update({
              savedPosts: admin.firestore.FieldValue.increment(1),
            });
          })
          .then(() => {
            return res.json(postData);
          });
      } else {
        return res.status(400).json({ error: "post already saved" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

export default handler;
