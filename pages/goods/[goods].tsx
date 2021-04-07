import log    from "../../modules/util/logUtil";
import { db } from "../../modules/db/connection";
import SQL    from "sql-template-strings";

export default function goods({ goods }){

  const good = goods[0];

  return (
    <div>
      <h1>商品詳細</h1>
      <h2>{good.name}</h2>
      <br/>
      <table border="1">
        <tr><th>Jan</th><td>{good.jan}</td></tr>
        <tr><th>WS Price</th><td>{good.ws} </td></tr>
        <tr><th>RT Price</th><td>{good.rt} </td></tr>
      </table>
    </div>
  );
}
export async function getServerSideProps({params}) {
  log.dbg("Server Side Props, Done!");

  const id    = params.goods;
  const dbs   = db().instance;
  const query = SQL`
    SELECT
      mg.goods_id         AS id
     ,mc.name             AS category
     ,mg.jan              AS jan
     ,mp.name             AS maker
     ,mg.name             AS name
     ,mg.unit_cost        AS cost
     ,mg.ws_price         AS ws
     ,mg.rt_price         AS rt
     ,mg.tax_rate  || '%' AS tax
     ,ms.name             AS user
    FROM m_goods mg
      LEFT JOIN m_category mc ON mg.category = mc.category
      LEFT JOIN m_company  mp ON mg.maker_id = mp.company_id
      LEFT JOIN m_staff    ms ON ms.staff_id = mg.regist_staff
    WHERE true
      AND NOT mg.is_delete
      AND     mg.goods_id = ${id}
    ;
  `;
	const goods  = await dbs.any(query.text, query.values)

  return { props: { goods } };
}
