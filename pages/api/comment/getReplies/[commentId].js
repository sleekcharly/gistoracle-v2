import nc from "next-connect";
import { db } from "../../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  // get comment replies
  await db
    .collection("comments")
    .where("commentId", "==", req.query.commentId)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let replies = [];
      data.forEach((doc) => {
        let replyId = doc.id;
        replies.push({
          replyId,
          ...doc.data(),
        });
      });
      return res.json(replies);
    })
    .catch((err) => console.error(err.response.data));
});

export default handler;
