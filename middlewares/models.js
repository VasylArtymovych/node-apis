const { getCollection } = require("../db/connection");

const collectionMiddleware = (req, res, next) => {
  req.db = getCollection();
  next();
};

module.exports = { collectionMiddleware };
