import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";
import FBAuth from "../../../utils/FBAuth";

const handler = nc();
handler.use(FBAuth);

handler.post(async (req, res) => {
  // extract form data in edited post
  const editedPost = {
    title: req.body.title,
    slug: req.body.slug,
    body: req.body.body,
    postId: req.body.postId,
    postThumbnail: req.body.postThumbnail,
  };

  // update post document
  await db
    .doc(`/posts/${editedPost.postId}`)
    .update({
      title: editedPost.title,
      body: editedPost.body,
      slug: editedPost.slug,
      postThumbnail: editedPost.postThumbnail,
    })
    .then(() => {
      return res.status(200).json("Post updated successfully");
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ general: "server error! could not update post" });
    });
});

export default handler;
