import mongo from "../../../db/mongo";
import Data from "../../../models/Data";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  await mongo();

  switch (method) {
    case "GET":
      try {
        const data = await Data.findById(id);

        if (!data) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const data = await Data.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!data) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const data = await Data.deleteOne({ _id: id });
        if (!data) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
