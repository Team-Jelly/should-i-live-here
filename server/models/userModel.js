// pgsql model for our user database
const createTable = `CREATE TABLE IF NOT EXISTS Users(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  hash VARCHAR NOT NULL,
  name VARCHAR NOT NULL
)`;

// export query string to be used when server first runs
module.exports = createTable;


// CREATE TABLE History (
//   id SERIAL PRIMARY KEY,
//   address VARCHAR NOT NULL,
//   userid INT NOT NULL,
//   FOREIGN KEY (userid) REFERENCES users (id));