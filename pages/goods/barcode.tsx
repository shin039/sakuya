import { useState, useEffect } from "react";
import log         from "../../modules/util/logUtil";
import { db }      from "../../modules/db/connection";
import SQL         from "sql-template-strings";
import Link        from "next/link";

export default function barcode({category}) {
  // ---------------------------------------------------------------------------
  // Check React Hook 
  // ---------------------------------------------------------------------------
  const [line, setLine] = useState([]);
  const [data, setData] = useState("");

  // Functions of List
  const addLine = ()      => { setLine([...line, data]); setData(""); };
  const delLine = (index:int) => {
    line.splice(index, 1);
    setLine([...line]) };

  // ---------------------------------------------------------------------------
  // Const
  // ---------------------------------------------------------------------------
  const [glist, setGList] = useState([]);
  const [gname, setGName] = useState("");

  const options = [];
  category.map((content, index) => {options.push({code: content.category, name: content.name}); });

  // ---------------------------------------------------------------------------
  // Function
  // ---------------------------------------------------------------------------
  const searchGoods = () => {
    log.dbg("# -- サーバサイド関数なのか... ------------------------------------");
    console.log(`  Search Goods Name: ${gname}`);
    log.dbg(`  Search Goods Name: ${gname}`);
  };

  // ---------------------------------------------------------------------------
  // Main
  // ---------------------------------------------------------------------------
  let js_category = {};

  // 初回処理
  const init = () => {
    // DEBUG 
    log.dbg("# Page inited!");
    
  };
  useEffect(init, []);


  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div>
      <h1>バーコードリスト作成</h1>

      {/* 入力フォーム */}
      <input  type="text" name="data" onChange={ e => setData(e.target.value) } value={data} />
      <button onClick={addLine}>追加</button>

      {/* 表示欄 */}
      <ul>
        {line.map((content, index) => {
          return <li key={index}>{content} <button onClick={ (e) => delLine(index) }>削除</button></li>;
        })}
      </ul>

      <hr/>
      
      {/* ------------------------------------------------------------------ */}
      {/* バーコードリスト作成画面                                           */}
      {/* ------------------------------------------------------------------ */}

      {/* 商品検索 */}
      <div>
        <h2>検索条件</h2>
        <label>Name: <input type="text" name="gname" onChange={ e => setGName(e.target.value) } value={gname} /></label>
        <br/> <br/>
        <label> Category: <select>{options.map(val => <option key={val.code} value={val.code}>{val.name}</option>)}</select>
        </label>
        <br/> <br/>
        <button onClick={searchGoods}>検索</button>
      </div>

      <hr/>

      {/* 商品リスト */}
      

      {/* 印刷リスト */}


    </div>
  );
}

export async function getServerSideProps(){
  log.dbg("Server Side Props, Done!");

  const dbs      = db().instance;
  const query    = SQL`SELECT category, name FROM m_category WHERE NOT is_delete;`;
  const category = await dbs.any(query.text, query.values);

  return {
    props: {
      category: category
    }
  };
}
