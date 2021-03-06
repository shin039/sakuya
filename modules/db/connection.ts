import {IMain, IDatabase} from "pg-promise";
import pgPromise          from "pg-promise";
import log                from "../util/logUtil";

const _pgp:IMain = pgPromise({/* Option */});

const _pg_host = process.env.PG_HOST;
const _pg_port = process.env.PG_PORT;
const _pg_user = process.env.PG_USER; 
const _pg_pass = process.env.PG_PASS; 

log.dbg("# Init Database Setting...")
log.dbg(`url  => ${_pg_host}:${_pg_port}`)
log.dbg(`user => ${_pg_user}`)

const config = {
  db: {
    host         : _pg_host,
    port         : _pg_port,
    database     : _pg_user,
    user         : _pg_user,
    password     : _pg_pass,
    max          : 10,
    query_timeout: 60000
  }
};


// Singleton
//   -> For. warning of "Duplicate database object with pg-promise"
export const db = () => {

  const db = global.database;

  if(db) return db;
  
  // Database Access Initialize
  log.out("# DB Access Object Create.")
  const newDB     = {};
  newDB.instance  = _pgp(config.db);
  global.database = newDB;
  return newDB;
}

