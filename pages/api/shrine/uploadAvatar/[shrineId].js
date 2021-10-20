import nc from "next-connect";
import { admin, db } from "../../../../utils/firebase/admin";
import FBAuth from "../../../../utils/FBAuth";

const handler = nc();

handler.use(FBAuth);

handler.post(async (req, res) => {
  // install the busboy package
  // then require the following packages
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  // create an instance of Busboy
  var busboy = new BusBoy({ headers: req.headers });

  // initiate the event
  let imageFileName;
  let imageToBeUploaded = {};

  // define a random number for naming the file stored on firebase storage
  const randNum = Math.round(Math.random() * 10000000000);

  // listener for receipt of file
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log("In file busboy");
    console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );
    // check to see if mimetype corresponds to requited image type
    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/jpg" &&
      mimetype !== "image/png" &&
      mimetype !== "image/webp" &&
      mimetype !== "image/tiff"
    ) {
      return res.status(400).json({
        image:
          "*** Wrong file type submitted, image must be in jpg, png, tiff or webp formats. ***",
      });
    }

    // get image Extension
    const imageExtension = filename.split(".")[filename.split(".").length - 1];

    //establish image file name with random numeber and image extension
    imageFileName = `${randNum}.${imageExtension}`;

    // establish image filepath
    const filepath = path.join(os.tmpdir(), imageFileName);

    //establish the image to be uploaded
    imageToBeUploaded = { filepath, mimetype };

    // pipe the file
    file.pipe(fs.createWriteStream(filepath));
  });

  // listener to finish operation
  busboy.on("finish", async () => {
    // set options for upload method
    const options = {
      destination: `shrineAvatars/${imageFileName}`,
      resumable: false,
      metadata: { metadata: { contentType: "image/webp" } },
    };

    // run upload operation to storage bucket
    await admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, options)
      .then(async (data) => {
        console.log("image uploaded to firebase storage");

        // define image url to be accessed by the client
        const shrineAvatar = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/shrineAvatars%2F${randNum}_600x600.webp?alt=media`;

        // log image url
        console.log("url: " + shrineAvatar);

        // update shrine collection with new shrineAvatar
        const shrineRef = db.doc(`/shrines/${req.query.shrineId}`);
        await shrineRef.update({ avatar: shrineAvatar });
      })
      .then(() => {
        return res.status(200).json({ message: "Image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });

  req.pipe(busboy);
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
