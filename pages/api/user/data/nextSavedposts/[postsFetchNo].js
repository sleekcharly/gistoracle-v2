import nc from "next-connect";
import { db } from "../../../../../utils/firebase/admin";
import FBAuth from "../../../../../utils/FBAuth";

const handler = nc();
handler.use(FBAuth);

handler.get(async (req, res) => {
  // get previous posts numbers
  let prevPosts = req.query.postsFetchNo - 10;

  // define saved posts variable containing list of user saved posts
  let savedPosts = req.user.savedPosts.slice(prevPosts, req.query.postsFetchNo);

  // define posts container
  let posts = [];

  // loop through saved posts to get saved posts from database
  for (var i = 0; i < savedPosts.length; i++) {
    // define query object
    let query = db
      .collection("posts")
      .where("postId", "==", savedPosts[i].postId);

    // run action on database
    await query.get().then((data) => {
      data.forEach((doc) => {
        posts.push({ postId: doc.id, ...doc.data() });
      });
    });
  }

  return res.json(posts);
});

export default handler;
