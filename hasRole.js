module.exports = function hasRole(roles) {
  return function(req, res, next) {
    if (!roles.includes(req.user.role)) {
      throw new Error("Not allowed");
    }
    next();
  };
};
