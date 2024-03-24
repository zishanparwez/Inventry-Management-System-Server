const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../persistence/models/user");
const { hash, verify } = require("../utils/encryption");
const config = require("../config");
const { validateUserAuthLoginRequestBody } = require("../validator/user.auth");

const tokenExpiritionSeconds = 7 * 24 * 60 * 60;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = validateUserAuthLoginRequestBody(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
        data: null,
      });
    }

    const isValid = await verify(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
        data: null,
      });
    }

    const token = jwt.sign(
      {
        uuid: user.uuid,
        verificationTokenType: "ACCESS_TOKEN",
      },
      config.jwt.secret,
      {
        expiresIn: Math.floor(Date.now() / 1000) + tokenExpiritionSeconds,
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Logged In",
      data: {
        token,
      },
    });
  } catch (e) {
    console.error(`Error in logging in`, e);

    if (e.name === "ValidationError") {
      const message = e.message || "Bad request";
      return res.status(400).json({
        status: 400,
        message: message.split(":")[0],
        data: null,
      });
    }

    return res.status(500).json({
      status: 500,
      message: e.message || "Internal server error",
      data: null,
    });
  }
});

router.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = validateUserAuthLoginRequestBody(req.body);

      const encryptedPassword = await hash(password);
  
      const newUser = new User({
        uuid: uuidv4(),
        name: name,
        email: email,
        password: encryptedPassword
      });

      await newUser.save();
      return res.status(201).json({
        status: 201,
        message: "User registered successuflly!",
        data: null,
      });

    } catch (e) {
      console.error(`Error in creating user`, e);
  
      if (e.name === "ValidationError") {
        const message = e.message || "Bad request";
        return res.status(400).json({
          status: 400,
          message: message.split(":")[0],
          data: null,
        });
      }
  
      return res.status(500).json({
        status: 500,
        message: e.message || "Internal server error",
        data: null,
      });
    }
  });



module.exports = router;