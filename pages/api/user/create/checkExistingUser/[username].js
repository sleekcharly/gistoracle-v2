import nc from "next-connect";
import { db } from "../../../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  await db
    .collection("users")
    .where("username", "==", req.params.username)
    .limit(1)
    .get()
    .then((data) => {
      if (data.docs[0]) {
        return res
          .status(400)
          .json({ username: "This username is already taken" });
      } else {
        return res.json("User does not exist");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

export default handler;
