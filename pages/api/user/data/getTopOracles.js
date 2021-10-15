import nc from "next-connect";
import { db } from "../../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  // define empty container for oracles
  let oracles = [];

  // get top 5 shrines
  await db
    .collection("users")
    .orderBy("vibrations", "desc")
    .limit(5)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        oracles.push(doc.data());
      });

      return res.status(200).json(oracles);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

export default handler;
