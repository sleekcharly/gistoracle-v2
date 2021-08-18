import nc from "next-connect";
import { db } from "../../../../../firebase";

const handler = nc();

handler.get(async (req, res) => {
  // extract user credentials
  let credentials = req.body;

  db.doc(`/users/${credentials.username}`)
    .set(credentials)
    .then(() => {
      console.log("profile created successfully");
      return res.status(200).json("profile created successfully");
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

export default handler;
