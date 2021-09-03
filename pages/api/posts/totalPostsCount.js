import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  // define postMetrics ref
  var postMetricsRef = await db.collection("postsMetrics").doc("count");

  //retrieve posts
  await postMetricsRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.json(doc.data().total);
      } else {
        console.log("no such document!");
      }
    })
    .catch((err) => {
      console.log("Error getting document: ", err);
    });
});

export default handler;
