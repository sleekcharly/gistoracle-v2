import nc from "next-connect";
import { db } from "../../../../../utils/firebase/admin";

const handler = nc();

handler.post(async (req, res) => {
  // check if email exists
  await db
    .collection("users")
    .where("email", "==", req.query.email)
    .limit(1)
    .get()
    .then((data) => {
      // check to see if email is already attached to an existing user
      if (data.docs[0]) {
        return res
          .status(400)
          .json({ email: "This email is already attached to a user" });
      } else {
        return res.json({ email: "No user exists with this email" });
      }
    });
});

export default handler;
