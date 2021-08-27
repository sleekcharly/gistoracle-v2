import nc from "next-connect";
import { auth } from "../../../../firebase";
import { db } from "../../../../utils/firebase/admin";
import { validateLoginData } from "../../../../utils/validator";

const handler = nc();

handler.post(async (req, res) => {
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
    .then(async () => {
      // if email exists send reset email
      await auth.sendPasswordResetEmail(user.email).then(() => {
        res
          .status(200)
          .json({ message: "Check your email to reset your password" });
      });
    })
    .catch((err) => {
      console.error(err);

      return res
        .status(500)
        .json({
          general:
            err.code === "auth/user-not-found"
              ? "Email does not exist on our database"
              : err.code === "auth/too-many-requests"
              ? err.message
              : "check that you have an active network connection",
        });
    });
});

export default handler;
