import pgPromise from "pg-promise";

console.log("# Init Connection Setting...")
console.log(`host => ${process.env.PG_HOST}`)
console.log(`port => ${process.env.PG_PORT}`)
console.log(`user => ${process.env.PG_USER}`)
console.log(`pass => ${process.env.PG_PASS}`)

const connection = {};

const _pgp     = pgPromise({/* Option Input */});

const _pg_host = process.env.PG_HOST;
const _pg_port = process.env.PG_PORT;
const _pg_user = process.env.PG_USER; 
const _pg_pass = process.env.PG_PASS; 

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

export const db = () => {
  if(connection.instance){
   console.log("# Connectioin Reuse.")
    return connection;
  }
 
  console.log("# Connectioin Create.")
  connection.instance = _pgp(config.db);
  return connection;
}

