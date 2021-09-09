// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongo from "../../../db/mongo";
import Data from "../../../models/Data";

export default async function handler(req, res) {
  const { method } = req;
  await mongo();

  switch (method) {
    case "GET":
      try {
        const data = await Data.find({});
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const data = await Data.create(req.body);
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
