import log    from "../../modules/util/logUtil";
import { db } from "../../modules/db/connection";
import SQL    from "sql-template-strings";

export default function staff({ staff }){

  const person = staff[0];

  return (
    <div>
      <h1>スタッフ詳細</h1>
      <h2>{person.name}</h2>
      <br/>
      <table border="1">
        <tr><th>ID</th><td>{person.id}      </td></tr>
        <tr><th>USER</th><td>{person.userid}</td></tr>
        <tr><th>NAME</th><td>{person.name}  </td></tr>
      </table>
    </div>
  );
}
export async function getServerSideProps({params}) {
  log.dbg("Server Side Props, Done!");

  const id    = params.staff;
  const dbs   = db().instance;
  const query = SQL`
    SELECT
       sf.staff_id AS id
      ,sf.userid   AS userid
      ,sf.name     AS name

    FROM m_staff sf
    WHERE true
      AND NOT sf.is_delete
      AND     sf.staff_id = ${id}
    ;
  `;
	const staff  = await dbs.any(query.text, query.values)

  return { props: { staff } };
}
