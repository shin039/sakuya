import { useState, useEffect } from "react";
import log         from "../../modules/util/logUtil";
import { db }      from "../../modules/db/connection";
import SQL         from "sql-template-strings";
import Link        from "next/link";

export default function barcode({category, prices}) {
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
  // Search Condition
  const [sname    , setSname]     = useState("");
  const [sCategory, setSCategory] = useState(0);

  // Goods List
  const [glist    , setGList]     = useState([]);


  const options = [];
  category.map((content, index) => {options.push({code: content.category, name: content.name}); });

  // ---------------------------------------------------------------------------
  // Function
  // ---------------------------------------------------------------------------
  const searchGoods = () => {
    log.out(`  Search Goods Name: ${sname}`);
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
    <>
      <h1>バーコードリスト作成</h1>

      {/* ------------------------------------------------------------------ */}
      {/* 試験確認用　　　　　　　                                           */}
      {/* ------------------------------------------------------------------ */}

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
      {/* 商品検索                                                           */}
      {/* ------------------------------------------------------------------ */}
      <div key="condition">
        <h2>検索条件</h2>
        <label>Name: <input type="text" name="sname" onChange={ e => setSname(e.target.value) } value={sname} /></label>
        <br/>
        <br/>
        <label> Category: <select>{options.map(val => <option key={val.code} value={val.code}>{val.name}</option>)}</select></label>
        <br/>
        <br/>
        <label> Type: 
          {prices.map(price => <label  key={price.company_id}><input type="radio" name="price" value={price.company_id}/>{price.name}</label>)}
        </label>
        <br/>
        <br/>
        <button onClick={searchGoods}>検索</button>
      </div>

      <hr/>

      {/* ------------------------------------------------------------------ */}
      {/* 商品ピックアップセクション                                         */}
      {/* ------------------------------------------------------------------ */}
      <div>
        {/* 商品リスト */}
        <div>Goods List</div>

        {/* D & D */}
  
        {/* 印刷リスト */}
        <div>Print List</div>

      {/* -- close/pickup seciton */}
      </div>

    {/* -- close/root div */}
    </>
  );
}

export async function getServerSideProps(){
  log.dbg("Server Side Props, Done!");

  const dbs      = db().instance;

  // Category
  const ct_query = SQL`SELECT category, name FROM m_category WHERE NOT is_delete;`;
  const category = await dbs.any(ct_query.text, ct_query.values);
  category.unshift({category: 0, name: '全て'});

  // Special Price
  const pr_query = SQL`
    SELECT
       company_id
      ,name
    FROM
        m_company 
    WHERE
        NOT is_delete
        AND company_id in (SELECT company_id FROM m_discount WHERE NOT is_delete GROUP BY company_id ORDER BY company_id)
    ;`;
  const pr_price = await dbs.any(pr_query.text, pr_query.values);
        pr_price.unshift({company_id: 0, name: '標準'});
  
  return {
    props: {
      category: category,
      prices  : pr_price
    }
  };
}
