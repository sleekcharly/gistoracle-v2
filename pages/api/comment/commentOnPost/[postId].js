import nc from "next-connect";
import { admin, db } from "../../../../utils/firebase/admin";
import FBAuth from "../../../../utils/FBAuth";

const handler = nc();

// use authentication middleware
handler.use(FBAuth);

handler.post(async (req, res) => {
  // initiate batch
  const batch = db.batch();
  console.log(req.body);

  // ensure user does not send an empty body
  if (req.body.body === "")
    return res.status(400).json({ comment: "Must not be empty" });

  // extract request body details
  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    postId: req.query.postId,
    commentPostId: req.query.postId,
    username: req.user.username,
    userImage: req.user.imageUrl,
    comments: 0,
    userId: req.user.uid,
  };

  // run comment on post operation
  await db
    .doc(`/posts/${req.query.postId}`)
    .get()
    .then((doc) => {
      // check if document exists
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }

      return db
        .collection("comments")
        .add(newComment)
        .then((doc) => {
          // add to new comment obeject
          newComment.commentId = doc.id;
        })
        .then((doc) => {
          // update user collection
          return db
            .collection("users")
            .where("username", "==", req.user.username)
            .limit(1)
            .get();
        })
        .then(async (data) => {
          // define user id
          let userId = [];

          //   get the user id
          data.forEach((doc) => {
            userId.push(doc.id);
          });

          // update posts collection
          const postRef = db.doc(`/posts/${req.query.postId}`);
          batch.update(postRef, {
            commentCount: admin.firestore.FieldValue.increment(1),
            userId: req.user.uid,
          });

          // update user collection
          const userRef = db.doc(`/users/${userId[0]}`);
          batch.update(userRef, {
            vibrations: admin.firestore.FieldValue.increment(0.2),
            userId: req.user.uid,
          });

          return batch.commit();
        })
        .then(() => {
          return res.json(newComment);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

export default handler;
