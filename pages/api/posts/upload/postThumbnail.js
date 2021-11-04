import nc from "next-connect";
import { admin, db } from "../../../../utils/firebase/admin";
import FBAuth from "../../../../utils/FBAuth";

const handler = nc();

handler.use(FBAuth);

handler.post(async (req, res) => {
  // install the busboy package
  // then require the following packages
  const BusBoy = require("busboy");
  const sharp = require("sharp");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  // create an instance of Busboy
  var busboy = new BusBoy({ headers: req.headers });

  // initiate the event
  let imageFileName;
  let imageToBeUploaded = {};
  let resizedImage = {};
  let resizedImageFilename = {};

  // define a random number for naming the file stored on firebase storage
  const randNum = Math.round(Math.random() * 10000000000);
  const randNum2 = Math.round(Math.random() * 10000000000);

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
        error: "wrong format",
        errorMessage:
          "*** Wrong file type submitted, image must be in jpg, png, tiff or webp formats. ***",
      });
    }

    //establish image file name with random numeber and image extension
    imageFileName = `${randNum}.webp`;
    resizedImageFilename = `${randNum2}.webp`;

    // establish image filepath
    const filepath = path.join(os.tmpdir(), imageFileName);
    const resizedImageFilepath = path.join(os.tmpdir(), resizedImageFilename);

    //establish the image to be uploaded
    imageToBeUploaded = { filepath, mimetype };
    resizedImage = { resizedImageFilepath, mimetype };

    // pipe the file
    file.pipe(fs.createWriteStream(filepath));
  });

  // listener to finish operation
  busboy.on("finish", async () => {
    // set options for upload method
    const options = {
      destination: `postThumbnails/${resizedImageFilename}`,
      resumable: false,
      metadata: { metadata: { contentType: "image/webp" } },
    };

    // run image resize and then upload to storage bucket
    await sharp(imageToBeUploaded.filepath)
      .resize(600, 600, { fit: "inside" })
      .toFile(resizedImage.resizedImageFilepath)
      .then((info) => {
        // upload to firebase storage bucket
        admin
          .storage()
          .bucket()
          .upload(resizedImage.resizedImageFilepath, options)
          .then(async (data) => {
            let file = data[0];

            console.log("image uploaded to firebase storage");

            // define image url to be accessed by the client
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/postThumbnails%2F${resizedImageFilename}?alt=media`;

            // create json file to be sent back to sunEditor
            const result = [
              {
                url: imageUrl,
                name: file.name,
                size: file.size,
              },
            ];

            console.log(result);

            return res.status(200).json({ result });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({
              error: err.code,
              errorMessage: "Image did not upload to server!",
            });
          });
      })
      .catch((err) => {
        console.error(err);
        console.log("could not resize image");
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
