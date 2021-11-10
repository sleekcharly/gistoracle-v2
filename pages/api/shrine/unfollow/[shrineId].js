import nc from "next-connect";
import FBAuth from "../../../../utils/FBAuth";
import { admin, db } from "../../../../utils/firebase/admin";

const handler = nc();
handler.use(FBAuth);

handler.get(async (req, res) => {
  // set up batch writes
  const batch = db.batch();

  // define follow document
  const followDocument = db
    .collection("shrineFollows")
    .where("userId", "==", req.user.userId)
    .where("shrineId", "==", req.query.shrineId)
    .limit(1);

  // define shrine document
  const shrineDocument = db.doc(`/shrines/${req.query.shrineId}`);

  // define shrineData object
  let shrineData;

  // perform action
  await shrineDocument
    .get()
    .then((doc) => {
      //check if document exists
      if (doc.exists) {
        // populate shrineData object
        shrineData = doc.data();
        shrineData.shrineId = doc.id;
        shrineData.followingUser = req.user.userId;
        return followDocument.get();
      } else {
        //return error message
        return res.status(404).json({ error: "Shrine not found" });
      }
    })
    .then((data) => {
      // check to see if data is empty
      if (data.empty) {
        return res.status(400).json({ error: "shrine not followed" });
      } else {
        // delete shrine follows document
        return db
          .doc(`/shrineFollows/${data.docs[0].id}`)
          .delete()
          .then(() => {
            shrineData.followers--;
            return shrineDocument.update({ followers: shrineData.followers });
          })
          .then(() => {
            return db
              .collection("shrineFollows")
              .where("shrineId", "==", req.query.shrineId)
              .limit(3)
              .get();
          })
          .then((data) => {
            let followersData = [];
            data.forEach((doc) => {
              followersData.push({ ...doc.data() });
            });

            shrineData.followersData = followersData;

            // get user document
            return db
              .collection("users")
              .where("username", "==", req.user.username)
              .limit(1)
              .get();
          })
          .then((data) => {
            let userId = [];
            data.forEach((doc) => {
              userId.push(doc.id);
            });

            const userRef = db.doc(`/users/${userId[0]}`);
            batch.update(userRef, {
              vibrations: admin.firestore.FieldValue.increment(-0.2),
              userId: req.user.userId,
              shrines: admin.firestore.FieldValue.arrayRemove(
                req.query.shrineId
              ),
            });

            //update shrine document
            const shrineRef = db.doc(`/shrines/${req.query.shrineId}`);
            batch.update(shrineRef, {
              users: admin.firestore.FieldValue.arrayRemove(req.user.userId),
              userId: req.user.userId,
            });

            // commit batch operation
            batch.commit();

            res.json(shrineData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

export default handler;
