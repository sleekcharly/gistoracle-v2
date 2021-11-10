import nc from "next-connect";
import { admin, db } from "../../../../utils/firebase/admin";
import FBAuth from "../../../../utils/FBAuth";

const handler = nc();

// use authentication middleware
handler.use(FBAuth);

handler.post(async (req, res) => {
  // initiate batch
  const batch = db.batch();

  // ensure user does not send an empty body
  if (req.body.body === "")
    return res.status(400).json({ commentReply: "Must not be empty" });

  // extract request body details
  const newReplyToComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    commentId: req.query.commentId,
    commentPostId: req.body.commentPostId,
    username: req.user.username,
    userImage: req.user.imageUrl,
    comments: 0,
    userId: req.user.uid,
  };

  // run reply operation
  await db
    .doc(`/comments/${req.query.commentId}`)
    .get()
    .then((doc) => {
      // check if document exists
      if (!doc.exists) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return db.collection("comments").add(newReplyToComment);
    })
    .then(() => {
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

      data.forEach((doc) => {
        userId.push(doc.id);
      });

      // update comment collection
      const commentRef = await db.doc(`/comments/${req.query.commentId}`);
      batch.update(commentRef, {
        comments: admin.firestore.FieldValue.increment(1),
        userId: req.user.uid,
      });

      // update user collection
      const userRef = await db.doc(`/users/${userId[0]}`);
      batch.update(userRef, {
        vibrations: admin.firestore.FieldValue.increment(0.2),
        userId: req.user.uid,
      });

      // update post collection
      const postRef = await db.doc(`/posts/${req.body.commentPostId}`);
      batch.update(postRef, {
        commentCount: admin.firestore.FieldValue.increment(1),
        userId: req.user.uid,
      });

      return batch.commit();
    })
    .then(() => {
      return res.json(newReplyToComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

export default handler;
