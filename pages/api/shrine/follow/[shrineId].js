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
        // add new document to shrine follows collection
        return db
          .collection("shrineFollows")
          .add({ shrineId: req.query.shrineId, userId: req.user.userId })
          .then(() => {
            // update shrineData collection for followers counter
            shrineData.followers++;
            // update shrineDocument in firestore
            return shrineDocument.update({ followers: shrineData.followers });
          })
          .then(() => {
            // get shrine follows document in collection matching userId and shrineId
            return db
              .collection("shrineFollows")
              .where("shrineId", "==", req.query.shrineId)
              .where("userId", "==", req.user.userId)
              .get();
          })
          .then((data) => {
            // define
            let followersData = [];
            data.forEach((doc) => {
              followersData.push({ ...doc.data() });
            });

            shrineData.followersData = followersData;

            // update user vibrations
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

            // update user vibrations
            const userRef = db.doc(`/users/${userId[0]}`);
            batch.update(userRef, {
              vibrations: admin.firestore.FieldValue.increment(0.2),
              shrines: admin.firestore.FieldValue.arrayUnion(
                req.query.shrineId
              ),
            });

            // update shrine document
            const shrineRef = db.doc(`/shrines/${req.query.shrineId}`);
            batch.update(shrineRef, {
              users: admin.firestore.FieldValue.arrayUnion(req.user.userId),
            });

            // run batch operation
            batch.commit();

            return res.json(shrineData);
          });
      } else {
        return res.status(400).json({ error: "shrine already followed" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

export default handler;
