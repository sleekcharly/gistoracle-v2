import nc from "next-connect";
import { db } from "../../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  //   get shrine
  let shrine = [];
  let shrineData = {};

  await db
    .collection("shrines")
    .where("name", "==", req.query.shrineName)
    .limit(1)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        shrine.push({ shrineId: doc.id, ...doc.data() });
      });

      shrineData = shrine[0];

      return shrineData;
    })
    .then((data) => {
      return db.doc(`/category/${data.categoryId}`).get();
    })
    .then((doc) => {
      shrineData.categoryName = doc.data().name;
      return db
        .collection("shrineFollows")
        .where("shrineId", "==", shrineData.shrineId)
        .get();
    })
    .then((data) => {
      let followers = [];
      data.forEach((doc) => {
        followers.push({ ...doc.data() });
      });

      shrineData.followersData = followers;

      return res.status(200).json(shrineData);
    })
    .catch((err) => console.error(err));
});

export default handler;
