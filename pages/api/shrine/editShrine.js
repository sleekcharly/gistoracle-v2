import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";
import FBAuth from "../../../utils/FBAuth";
import { validateEditedShrineData } from "../../../utils/validator";

const handler = nc();

handler.use(FBAuth);

handler.post(async (req, res) => {
  // get body data from request
  const editedShrine = {
    name: req.body.name,
    description: req.body.description,
  };

  // get currentShrineName
  const currentShrineName = req.body.currentShrineName;

  // perform validation before proceeding
  const { valid, errors } = validateEditedShrineData(editedShrine);

  // return error if any errors exists
  if (!valid) return res.status(400).json(errors);

  // proceed if no errors exists
  if (currentShrineName !== editedShrine.name) {
    await db
      .collection("shrines")
      .where("name", "==", editedShrine.name)
      .limit(1)
      .get()
      .then(async (data) => {
        if (data.docs[0]) {
          return res
            .status(400)
            .json({ shrineName: "This name is already taken" });
        } else {
          // if valid update shrine
          await db
            .doc(`/shrines/${req.body.shrineId}`)
            .update(editedShrine)
            .then((doc) => {
              console.log(doc);
              console.log("shrine updated successfully");
              return res.json("shrine updated successfully");
            })
            .catch((err) => console.error(err));
        }
      });
  } else {
    // if valid update shrine
    await db
      .doc(`/shrines/${req.body.shrineId}`)
      .update(editedShrine)
      .then((doc) => {
        console.log(doc);
        console.log("shrine updated successfully");
        return res.json("shrine updated successfully");
      })
      .catch((err) => console.error(err));
  }
});

export default handler;
