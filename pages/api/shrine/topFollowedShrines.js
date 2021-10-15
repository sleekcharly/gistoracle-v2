import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  // get top 5 shrines
  await db
    .collection("shrines")
    .orderBy("followers", "desc")
    .limit(5)
    .get()
    .then((data) => {
      let shrines = [];

      data.forEach((doc) => {
        shrines.push({
          shrineId: doc.id,
          ...doc.data(),
        });
      });

      return res.status(200).json(shrines);
    })
    .catch((err) => {
      console.error(err);
    });
});

export default handler;
