import log    from "../../modules/util/logUtil";
import { db } from "../../modules/db/connection";
import SQL    from "sql-template-strings";
import Link   from "next/link";

export default function index({ staff }) {
  return (
    <div>
      <h1>スタッフ一覧</h1>
      <ul>
        {staff.map( person => {
          return <li key={person.id}><Link href={`/staff/${person.id}`}>{person.name}</Link></li>;
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
      sf.staff_id AS id
     ,sf.name     AS name
    FROM m_staff sf
    WHERE true
      AND NOT sf.is_delete
    ;
  `;
	const staff  = await dbs.any(query.text, query.values)

  return { props: { staff } };
}
