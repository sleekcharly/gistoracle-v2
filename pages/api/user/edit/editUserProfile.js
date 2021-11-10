import nc from "next-connect";
import { db } from "../../../../utils/firebase/admin";
import FBAuth from "../../../../utils/FBAuth";
import { validateUserProfileData } from "../../../../utils/validator";

const handler = nc();

handler.use(FBAuth);

handler.post(async (req, res) => {
  // extract user details fro request body
  const userDetails = {
    email: req.body.email,
    username: req.body.username,
    displayName: req.body.displayName,
    about: req.body.about,
  };

  // container for filtered new user Details not existing in database
  let newUserDetails = {};

  // define userId array container
  let userId = [];

  // check for validation errors
  const { valid, errors } = validateUserProfileData(userDetails);
  if (!valid) return res.status(400).json(errors);

  // if the data provided is valid, check to see if username provided already exixts
  if (userDetails.username !== req.user.username) {
    await db
      .collection("users")
      .where("username", "==", userDetails.username)
      .limit(1)
      .get()
      .then((data) => {
        // check to see if username already exists
        if (data.docs[0]) {
          return res
            .status(400)
            .json({ username: "This username is already taken" });
        }
        newUserDetails.username = userDetails.username;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // if all checks out fine run update operation on database
  await db
    .collection("users")
    .where("username", "==", req.user.username)
    .limit(1)
    .get()
    .then(async (data) => {
      //  get user id
      data.forEach((doc) => {
        userId.push(doc.id);
      });

      // update user details in database
      newUserDetails.displayName = userDetails.displayName;
      newUserDetails.about = userDetails.about;
      newUserDetails.email = userDetails.email;
      newUserDetails.userId = req.user.uid;

      // update user details from derived user id
      await db
        .doc(`/users/${userId[0]}`)
        .update(newUserDetails)
        .then(() => {
          // run console message
          console.log("User data updated successfully");
          return res
            .status(200)
            .json({ updateSuccess: "User data updated successfully" });
        })
        .catch((err) => {
          // run console error message
          console.error(err);
          return res
            .status(500)
            .json({ general: "Error from server, try again in a few moment" });
        });
    })
    .catch((err) => {
      // run console error message
      console.error(err);
      return res
        .status(500)
        .json({ general: "Server error, could not update profile" });
    });
});

export default handler;
