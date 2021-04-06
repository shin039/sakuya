// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import log                                 from "../../util/logUtil";
import { db }                              from "../../modules/db/connection";
import SQL                                 from "sql-template-strings";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dbs   = db().instance;
  const query = SQL`
    SELECT
      mg.goods_id         AS ID
     ,mc.name             AS カテゴリ
     ,mp.name             AS メーカー
     ,mg.name             AS 商品
     ,mg.unit_cost        AS 原価
     ,mg.ws_price         AS 卸値
     ,mg.rt_price         AS 小売値
     ,mg.tax_rate  || '%' AS 税率
     ,ms.name             AS 登録ユーザ
    FROM m_goods mg
      LEFT JOIN m_category mc ON mg.category = mc.category
      LEFT JOIN m_company  mp ON mg.maker_id = mp.company_id
      LEFT JOIN m_staff    ms ON ms.staff_id = mg.regist_staff
    WHERE true
      AND NOT mg.is_delete
    ;
  `;
	const data  = await dbs.any(query.text, query.values)
	res.status(200).json({ data });
}
