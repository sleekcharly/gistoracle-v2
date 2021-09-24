import nc from "next-connect";
import { db } from "../../../../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  // define orderBy parameter
  let filter = "";
  if (req.query.parameter === "new") {
    filter = "createdAt";
  } else if (req.query.parameter === "top") {
    filter = "likes";
  } else if (req.query.parameter === "spicy") {
    filter = "commentCount";
  }

  // retrieve posts
  await db
    .collection("posts")
    .where("username", "==", req.query.username)
    .orderBy(filter, "desc")
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
