import nc from "next-connect";
import { auth } from "../../../../firebase";
import { db } from "../../../../utils/firebase/admin";
import { validateLoginData } from "../../../../utils/validator";

const handler = nc();

handler.get(async (req, res) => {
  // define status object
  let status = {};

  // create user object from
  const user = {
    email: req.body.email,
  };

  // validate user email using validator
  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  // after successful validation
  let userRef = db.collection("users").where("email", "==", user.email);

  await userRef
    .get()
    .then((snapshot) => {
      // check to see if email already exists
      if (snapshot.empty) {
        console.log("not found");
        return res.status(400).json({ email: "email does not exist" });
      } else {
        // if email exists send reset email
        return auth.sendPasswordResetEmail(user.email).then(() => {
          res.json({ message: "Check your email to reset your password" });
        });
      }
    })
    .catch((err) => {
      console.error(err);

      return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    });
});

export default handler;
