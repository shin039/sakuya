// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { db }                              from "../../modules/db/connection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dbs  = db().instance;
	const data = await dbs.any( "select * from m_staff")
	res.status(200).json({ data });
}
