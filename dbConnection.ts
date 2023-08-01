// Sets up a connection pool for the
// development database
import knex from "knex";
import knexfile from "./knexfile"

const db = knex(knexfile.development)

const closeConnection = () => db.destroy();

export {
  db,
  closeConnection
}