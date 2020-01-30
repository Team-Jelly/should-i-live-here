const fs = require('fs');
const path = require('path');
const db = require('../server/models/db');

const testJsonFile = path.resolve(__dirname, '/db.test.json');

describe('insert into database', () => {

  // beforeAll((done) => {
  //   // stuff
  // });

  // afterAll((done) => {
  //   // stuff
  // });

  it('3 should equal 3', () => {
    expect(3).toEqual(3);
  })

  const test = db.query('SELECT * FROM users;', async (error, user) => {
    if (error) {
      return next(error);
    }
  })
  console.log('*********************** test: ', test)

  it('adds a user to database', () => {
    const { email, hash, name } = { email: 'dbtest1@test.com', hash: 'dbtesthash1', name: 'dbtestname1' }
    const queryString = `INSERT INTO users (email, hash, name) VALUES ($1, $2, $3)`;

    const result = db.query(queryString, [email, hash, name], async (error, user) => {
      if (error) {
        return next(error);
      }
    });
    expect(result).not.toBeInstanceOf(Error); // would failed query result in Error? 

    const queryString2 = `SELECT email, hash, name FROM users WHERE hash = 'dbtesthash1';`
    const actual = JSON.parse(db.query(queryString2));
    const expected = JSON.parse({ email: 'dbtest1@test.com', hash: 'dbtesthash1', name: 'dbtestname1' })
    expect(actual).toEqual(expected);
  })

  // ??
  it('should return an error if required fields are not provided', () => {
    const { email } = { email: 'dbtest1@test.com', hash: 'dbtesthash1', name: 'dbtestname1' }
    const queryString3 = `INSERT INTO users (email) VALUES ($1)`;

    const result = db.query(queryString3, [email], async (error, user) => {
      if (error) {
        return next(error);
      }
    });
    expect(result).toBeInstanceOf(Error);
  });

  it('adds to history table when fetch request is made to API', () => {



  })


});

