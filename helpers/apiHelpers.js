const controllerWraper = (controler) => {
  return (req, res, next) => {
    controler(req, res).catch(next);
  };
};

module.exports = {
  controllerWraper,
};
