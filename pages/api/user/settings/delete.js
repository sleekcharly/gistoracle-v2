import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { db } from "../../../../utils/firebase/admin";

const handler = nc();

// use authenticaton middleware
handler.use(FBAuth);

handler.post(async (req, res) => {
  // get user id for deletion
  const userId = [];

  // get user id then run user collection deltion from firestore
  await db
    .collection("users")
    .where("username", "==", req.user.username)
    .limit(1)
    .get()
    .then(async (data) => {
      // populate userId list
      data.forEach((doc) => {
        userId.push(doc.id);
      });

      console.log(userId);
      // delete user profile in database
      await db
        .doc(`/users/${userId[0]}`)
        .delete()
        .then(() => {
          console.log("User profile deleted");
          res.status(200).json("User profile deleted");
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.error((err) => {
        console.error(err);
        return res.status(500).json("server error");
      });
    });
});

export default handler;
