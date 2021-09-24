import nc from "next-connect";
import { db } from "../../../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  // retrieve posts
  await db
    .collection("posts")
    .where("username", "==", req.query.username)
    .orderBy("createdAt", "desc")
    .limit(15)
    .get()
    .then((data) => {
      // create a list to hold posts
      let posts = [];

      // populate the list
      data.forEach((doc) => {
        posts.push({ postId: doc.id, ...doc.data() });
      });

      return res.json(posts);
    })
    .catch((err) => {
      console.error(err);
    });
});

export default handler;
