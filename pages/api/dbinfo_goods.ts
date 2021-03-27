// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import log                                 from "../../util/logUtil";
import { db }                              from "../../modules/db/connection";
import SQL                                 from "sql-template-strings";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dbs   = db().instance;
  const query = SQL`select * from m_goods`;
	const data  = await dbs.any(query.text, query.values)
	res.status(200).json({ data });
}
