import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { admin, db } from "../../../../utils/firebase/admin";

const handler = nc();
handler.use(FBAuth);

handler.get(async (req, res) => {
  // get like document
  const likeDocument = db
    .collection("postLikes")
    .where("username", "==", req.user.username)
    .where("postId", "==", req.query.postId)
    .limit(1);

  // get post document
  const postDocument = db.doc(`/posts/${req.query.postId}`);

  //post data object
  let postData;

  // check to see if post exist before liking
  await postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("postLikes")
          .add({ postId: req.query.postId, username: req.user.username })
          .then(() => {
            postData.likes++;
            return postDocument.update({ likes: postData.likes });
          })
          .then(() => {
            return db
              .collection("users")
              .where("username", "==", req.user.username)
              .limit(1)
              .get();
          })
          .then((data) => {
            //   get userId
            let userId = [];
            data.forEach((doc) => {
              userId.push(doc.id);
            });

            const userRef = db.doc(`/users/${userId[0]}`);

            userRef.update({
              vibrations: admin.firestore.FieldValue.increment(0.15),
            });

            return res.json(postData);
          });
      } else {
        return res.status(400).json({ error: "post already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

export default handler;