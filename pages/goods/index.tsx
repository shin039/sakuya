import log    from "../../modules/util/logUtil";
import { db } from "../../modules/db/connection";
import SQL    from "sql-template-strings";
import Link   from "next/link";

export default function index({ goods }) {
  return (
    <div>
      <h1>商品一覧</h1>
      <ul>
        {goods.map( good => {
          return <li key={good.id}><Link href={`/goods/${good.id}`}>{good.name}</Link></li>;
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  log.dbg("Server Side Props, Done!");

  const dbs   = db().instance;
  const query = SQL`
    SELECT
      mg.goods_id AS id
     ,mg.name     AS name
    FROM m_goods mg
    WHERE true
      AND NOT mg.is_delete
    ;
  `;
	const goods  = await dbs.any(query.text, query.values)

  return { props: { goods } };
}
