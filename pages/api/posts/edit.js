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
    userId: req.user.uid,
  };

  // update post document
  await db
    .doc(`/posts/${editedPost.postId}`)
    .update({
      title: editedPost.title,
      body: editedPost.body,
      slug: editedPost.slug,
      postThumbnail: editedPost.postThumbnail,
      userId: editedPost.userId,
    })
    .then(async () => {
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
              slug: editedPost.slug,
            })
            .then(() => {
              console.log("Document updated");
            })
            .catch((error) => {
              console.error("Error updating document", error);
            });
        })
        .catch((err) => console.error(err));

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
