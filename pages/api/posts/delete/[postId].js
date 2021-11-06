import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { admin, db } from "../../../../utils/firebase/admin";

const handler = nc();
handler.use(FBAuth);

handler.delete(async (req, res) => {
  // retrieve document from database
  const document = db.doc(`/posts/${req.query.postId}`);

  //run delete operation
  await document
    .get()
    .then(async (doc) => {
      //check if the document exists in the database
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }

      // ensure user can only delete post created by user
      if (doc.data().username !== req.user.username) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        await document.delete();
      }
    })
    .then(() => {
      return res.status(200).json("post deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

export default handler;
