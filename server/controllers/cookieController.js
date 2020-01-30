const cookieController = {};

// set cookie upon each visit to the root directory to store
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('secret', res.locals.user.email);
};

module.exports = cookieController;
