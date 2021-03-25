// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { db }                              from "../../modules/database";

export default async (req: any, res: any) => {
  const dbs  = db().instance;
	const data = await dbs.any( "select staff_id from m_staff")
	res.status(200).json({ data });
}
