import nc from "next-connect";
import { db } from "../../../../../utils/firebase/admin";

const handler = nc();

handler.post(async (req, res) => {
  // extract user credentials
  let credentials = req.body;

  await db
    .collection("userSiteData")
    .where("userName", "==", credentials.username)
    .limit(1)
    .get()
    .then(async (data) => {
      if (data.docs[0]) {
        console.log("site data exists");
      } else {
        let siteData = {
          userName: credentials.username,
          updatedAt: new Date().toISOString(),
          userId: credentials.userId,
        };

        await db
          .collection("userSiteData")
          .add(siteData)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    })
    .catch((err) => console.error(err));

  await db
    .doc(`/users/${credentials.username}`)
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
