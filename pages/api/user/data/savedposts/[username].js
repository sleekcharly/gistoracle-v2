import nc from "next-connect";
import { db } from "../../../../../utils/firebase/admin";
import FBAuth from "../../../../../utils/FBAuth";

const handler = nc();
handler.use(FBAuth);

handler.get(async (req, res) => {
  // define saved posts variable containing list of user saved posts
  let savedPosts = req.user.savedPosts.slice(0, 10);

  // define posts array
  let posts = [];

  // loop through saved posts to get saved posts from database
  if (savedPosts) {
    for (var i = 0; i < savedPosts.length; i++) {
      // define query
      let query = db
        .collection("posts")
        .where("postId", "==", savedPosts[i].postId);

      await query.get().then((data) => {
        data.forEach((doc) => {
          posts.push({ postId: doc.id, ...doc.data() });
        });
      });
    }
  } else {
    return res.status(404).json({ error: "No saved posts" });
  }

  return res.json(posts);
});

export default handler;
