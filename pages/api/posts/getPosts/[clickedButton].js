import nc from "next-connect";
import { db } from "../../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  // define orderBy parameter
  let filter = "";
  if (req.query.clickedButton === "new") {
    filter = "createdAt";
  } else if (req.query.clickedButton === "top") {
    filter = "likes";
  } else if (req.query.clickedButton === "spicy") {
    filter = "commentCount";
  }

  //retrieve posts
  await db
    .collection("posts")
    .orderBy(filter, "desc")
    .limit(15)
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(posts);
    })
    .catch((err) => console.error(err));
});

export default handler;
