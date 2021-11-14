import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { admin, db } from "../../../../utils/firebase/admin";

const handler = nc();

// use authentication middleware
handler.use(FBAuth);

handler.post(async (req, res) => {
  //   initiate batch
  const batch = db.batch();

  // return if body is empty
  if (req.body.body === "")
    return res
      .status(400)
      .json({ commentReply: "Please enter a reply to this comment" });

  // define comment data from req and authenticated user
  const newCommentOnComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    commentId: req.query.replyId,
    commentPostId: req.body.postId,
    userImage: req.user.imageUrl,
    username: req.user.username,
    comments: 0,
    userId: req.user.uid,
  };

  // perform reply to comment operation
  await db
    .doc(`/comments/${req.query.replyId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return db.collection("comments").add(newCommentOnComment);
    })
    .then(() => {
      // update user vibrations
      return db
        .collection("users")
        .where("username", "==", req.user.username)
        .limit(1)
        .get();
    })
    .then(async (data) => {
      let userId = [];
      data.forEach((doc) => {
        userId.push(doc.id);
      });

      // update page data for sitemap
      await db
        .collection("postSiteData")
        .where("postId", "==", req.body.postId)
        .limit(1)
        .get()
        .then(async (data) => {
          let siteId = [];

          data.forEach((doc) => {
            siteId.push(doc.id);
          });

          await db
            .collection("postSiteData")
            .doc(siteId[0])
            .update({
              updatedAt: new Date().toISOString(),
              userId: req.user.uid,
            })
            .then(() => {
              console.log("Document updated");
            })
            .catch((error) => {
              console.error("Error updating document", error);
            });
        })
        .catch((err) => console.error(err));

      const commentRef = db.doc(`/comments/${req.query.replyId}`);
      batch.update(commentRef, {
        comments: admin.firestore.FieldValue.increment(1),
        userId: req.user.uid,
      });

      const userRef = db.doc(`/users/${userId[0]}`);
      batch.update(userRef, {
        vibrations: admin.firestore.FieldValue.increment(0.2),
        userId: req.user.uid,
      });

      const postRef = db.doc(`/posts/${req.body.postId}`);
      batch.update(postRef, {
        commentCount: admin.firestore.FieldValue.increment(1),
        userId: req.user.uid,
      });

      return batch.commit();
    })
    .then(() => {
      return res.json(newCommentOnComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

export default handler;
