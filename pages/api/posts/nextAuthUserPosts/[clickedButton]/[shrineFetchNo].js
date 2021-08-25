import nc from "next-connect";
import { db } from "../../../../../utils/firebase/admin";

const handler = nc();
handler.use(FBAuth);

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

  // retrieve posts
  // start paginate
  // define shrines variable containing list of user subscribed shrines
  let prevShrines = req.query.shrineFetchNo - 10;

  let shrines = req.user.shrines.slice(prevShrines, req.query.shrineFetchNo);

  // define posts array
  let posts = [];

  // loop through subscribed shrines to get user tailored posts
  for (i = 0; i < shrines.length; i++) {
    let query = await db
      .collection("posts")
      .where("shrineId", "==", shrines[i])
      .limit(3);

    const data = await query.get().then((data) => {
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          ...doc.data(),
        });
      });
    });
  }

  posts = posts.sort((a, b) => {
    if (filter === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (filter === "likes") {
      return b.likes - a.likes;
    } else {
      return b.commentCount - a.commentCount;
    }
  });

  return res.json(posts);
});

export default handler;
