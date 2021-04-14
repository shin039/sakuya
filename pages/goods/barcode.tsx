import { useState} from "react";
import log         from "../../modules/util/logUtil";
import { db }      from "../../modules/db/connection";
import SQL         from "sql-template-strings";
import Link        from "next/link";

export default function barcode() {
  const [line, setLine] = useState([]);
  const [data, setData] = useState("");

  const addLine = () => {
    setLine([...line, data]);
    setData("");
  }

  return (
    <div>
      <h1>バーコードリスト作成</h1>

      {/* 入力フォーム */}
      <input  type="text" name="data" onChange={e => setData(e.target.value)} value={data} />
      <button onClick={addLine}>追加</button>

      {/* 表示欄 */}
      <ul>
        {line.map((data, index) => {
          return <li key={index}>{data} <button onClick={() => {line.splice(index, 1); console.log(line); setLine([...line])}}>削除</button></li>;
        })}
      </ul>
    </div>
  );
}
