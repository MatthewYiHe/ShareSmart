const express = require("express");
const app = express();
const PORT = 8080;
const jwt = require("jsonwebtoken");

const secretKey = "somesauce";

function verifyToken(req, res, next) {
  // Get authorization header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== undefined) {
    // Split at the space, then get token
    token = bearerHeader.split(" ")[1];
    // Next middleware
    next();
  } else {
    res.sendStatus(403);
  };
};

// home page for testing
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome!"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(token, secretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      // sign a new fresh token if user pass the verification
      jwt.sign({ user: authData.user }, secretKey, { expiresIn: "60s" }, (err, token) => {
        res.json({
          message: "You are logged in!",
          authData,
          token
        });
      });
    };
  });
});

app.post("/api/login", (req, res) => {
  //mock user
  const user = {
    id: 1,
    username: "Matthew",
    email: "matthew@gmail.com"
  }
  // Asynchronous Sign with default
  jwt.sign({ user }, secretKey, { expiresIn: "60s" }, (err, token) => {
    res.json({
      token
    });
  });
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});