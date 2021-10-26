import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";
import FBAuth from "../../../utils/FBAuth";
import { validateNewShrineData } from "../../../utils/validator";

const handler = nc();

handler.use(FBAuth);

handler.post(async (req, res) => {
  // extract form data in new shrine
  const newShrine = {
    name: req.body.shrineName,
    creator: req.user.username,
    creatorImage: req.user.imageUrl,
    avatar: "",
    createdAt: new Date().toISOString(),
    followers: 0,
    postIds: [],
    users: [],
    posts: 0,
    categoryName: req.body.categoryName,
    categoryId: null,
    description: req.body.description,
  };

  const { valid, errors } = validateNewShrineData(newShrine);

  // return errors if any exists
  if (!valid) return res.status(400).json(errors);

  // proceed if no errors exist
  await db
    .collection("shrines")
    .where("name", "==", newShrine.name)
    .limit(1)
    .get()
    .then(async (data) => {
      //   check if shrineName exists
      if (data.docs[0]) {
        return res
          .status(400)
          .json({ shrineName: "This name is already taken" });
      } else {
        // get and attach categoryId
        await db
          .collection("category")
          .where("name", "==", newShrine.categoryName)
          .limit(1)
          .get()
          .then(async (data) => {
            let categoryId = [];
            data.forEach((doc) => {
              categoryId.push(doc.id);
            });

            newShrine.categoryId = categoryId[0];

            // add new shrine to shrines collection in database
            await db
              .collection("shrines")
              .add(newShrine)
              .then((doc) => {
                const newShrineId = doc.id;

                return res.json(newShrineId);
              })
              .catch((err) => {
                console.error(err);
                return res
                  .status(500)
                  .json({ error: "could not add new shrine to database" });
              });
          })
          .catch((err) => {
            console.error(err);
            return res
              .status(500)
              .json({ serverError: "could not get category of new shrine" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ serverError: "could not perform create shrine operation" });
    });
});

export default handler;
