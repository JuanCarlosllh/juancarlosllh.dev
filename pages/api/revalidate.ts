import { NextApiHandler } from "next";

const revalidate: NextApiHandler = async (req, res) => {
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }
  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};

export default revalidate;
