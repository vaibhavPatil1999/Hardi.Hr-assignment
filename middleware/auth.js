const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");
const auth = async (req, res, next) => {
  const authToken = req.rawHeaders[1].split(" ")[1];
  try {
    const valid = jwt.verify(authToken, process.env.JWT_ACCESS_KEY);
    const admin = await adminModel.findById(valid);
    if (admin != null) {
      next();
    } else {
      res.json({
        warnning: "you are not registered as admin , please registered first",
      });
    }
  } catch (error) {
    res.json({
      warnning: "you are not authorised to perform this task",
      error,
    });
  }
};
module.exports = auth;
