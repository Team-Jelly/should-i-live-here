const db = require('../models/db');

const searchHistoryController = {};

searchHistoryController.addSearch = (req, res, next) => {
  if (res.locals.info === false) {
    next()
  } else {
    const { addressFinal, boroughFinal, userID } = res.locals.info;
    db.query(`INSERT INTO history (userid, address, borough) VALUES (${userID}, '${addressFinal}', '${boroughFinal}')`)
    next();
  }
}

searchHistoryController.getHistory = (req, res, next) => {
  db.query(`Select * FROM history Where userid = ${req.params.user}`)
    .then((data) => {
      console.log(data)
      res.locals.history = data.rows
      next();
    })
    .catch((err) => next(err))
}


module.exports = searchHistoryController;
