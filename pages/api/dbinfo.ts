// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { db }                              from "../../modules/db/connection";
import SQL                                 from "sql-template-strings";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dbs   = db().instance;
  const id    = 1;
  const query = SQL`select * from m_staff where staff_id = ${id}`;
	const data  = await dbs.any(query.text, query.values)
	res.status(200).json({ data });
}
