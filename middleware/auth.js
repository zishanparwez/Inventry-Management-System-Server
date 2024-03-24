const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyjwt(req, res, next) {
  const tokenWithBearerPrefix = req.headers["authorization"];
  if (
    !tokenWithBearerPrefix ||
    !typeof tokenWithBearerPrefix === "string" ||
    tokenWithBearerPrefix.split(" ").length < 2
  ) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }

  const token = tokenWithBearerPrefix.split(" ")[1];

  if (!token)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(`Error while authenticating`, e);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }
}

module.exports = verifyjwt;