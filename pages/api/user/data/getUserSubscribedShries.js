import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { db } from "../../../../utils/firebase/admin";

const handler = nc();
handler.use(FBAuth);

handler.get(async (req, res) => {
  await db
    .collection("shrines")
    .where("users", "array-contains", req.user.userId)
    .orderBy("latestPostCreation", "desc")
    .get()
    .then((data) => {
      let shrines = [];
      data.forEach((doc) => {
        shrines.push({
          shrineId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(shrines);
    })
    .catch((err) => console.error(err));
});

export default handler;
