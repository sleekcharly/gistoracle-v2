import nc from "next-connect";
import { db } from "../../../../../../utils/firebase/admin";

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

  // retrive posts for pagination
  if (filter === "createdAt") {
    const next = db
      .collection("posts")
      .where("categoryName", "==", req.query.categoryName)
      .orderBy(filter, "desc")
      .startAfter(`${req.query.parameter}`)
      .limit(10);

    // use the query for pagination
    const nextSnapshot = await next
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
  } else {
    const docRef = db.collection("posts").doc(req.query.parameter);
    const snapshot = await docRef.get();

    const next = db
      .collection("posts")
      .where("categoryName", "==", req.query.categoryName)
      .orderBy(filter, "desc")
      .startAfter(snapshot)
      .limit(10);

    // use the query for pagination
    const nextSnapshot = await next
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
  }
});

export default handler;
