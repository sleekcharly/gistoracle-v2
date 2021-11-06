import nc from "next-connect";
import { db } from "../../../utils/firebase/admin";

const handler = nc();

handler.post(async (req, res) => {
  // get report body
  const reportDetails = req.body;

  await db
    .collection("reports")
    .add(reportDetails)
    .then((doc) => {
      console.log("Report submitted with ID: ", doc.id);
      return res.status(200).json("Report submitted successfully");
    })
    .catch((err) => {
      console.error("Error submitting report: ", err.message);
      return res.status(500).json("server error ! could not report user");
    });
});

export default handler;
