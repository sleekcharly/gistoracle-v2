import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";

const handler = nc();

handler.get(async (req, res) => {
  await db
    .collection("category")
    .limit(6)
    .orderBy("nav")
    .get()
    .then((data) => {
      let featuredNavCategories = [];
      data.forEach((doc) => {
        featuredNavCategories.push({
          featuredNavCategoryId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(featuredNavCategories);
    })
    .catch((err) => console.error(err));
});

export default handler;
