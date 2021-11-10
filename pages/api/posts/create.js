import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";
import FBAuth from "../../../utils/FBAuth";

const handler = nc();
handler.use(FBAuth);

handler.post(async (req, res) => {
  // extract form data in newPost variable
  const newPost = {
    title: req.body.title,
    slug: req.body.slug,
    body: req.body.body,
    username: req.user.username,
    userImage: req.user.imageUrl,
    location: req.user.location,
    createdAt: new Date().toISOString(),
    likes: 0,
    saves: 0,
    unlikes: 0,
    commentCount: 0,
    shrineId: req.body.shrineId,
    postId: "",
    categoryId: req.body.categoryId,
    categoryName: req.body.categoryName,
    shrineName: req.body.shrineName,
    postThumbnail: req.body.postThumbnail ? req.body.postThumbnail : "",
    userId: req.user.uid,
  };

  // create new post document
  await db
    .collection("posts")
    .add(newPost)
    .then(async (doc) => {
      // set postId field
      await db
        .collection("posts")
        .doc(doc.id)
        .update({ postId: doc.id, userId: req.user.uid })
        .then(async () => {
          // get firebase admin object
          const admin = require("firebase-admin");

          // update the shrines collection posts array field in firebase
          await db
            .collection("shrines")
            .doc(newPost.shrineId)
            .update({
              postIds: admin.firestore.FieldValue.arrayUnion(doc.id),
              userId: req.user.uid,
            })
            .then(() => {
              return res.status(200).json("post created successfully");
            })
            .catch((err) => {
              console.error(err);
              console.log(
                "firebase error ! could not update postIds field in shrines collection"
              );
            });
        })
        .catch((err) => {
          console.error(err);
          console.log(
            "firebase error ! could not update postId field in posts collection"
          );
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ general: "server error! could not create new post" });
    });
});

export default handler;
