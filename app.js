const express = require("express");
const app = express();
const PORT = 8080;
const jwt = require("jsonwebtoken");

// home page for testing
app.get("/",(req, res) => {
  res.json({
    message:"Welcome!"
  });
});

app.post("/posts", verifyToken, (req, res) => {
  jwt.verify(token, "somesauce", (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "You are logged in!",
        authData
      });
    }
  });
});

app.post("/login",(req, res) => {
  //mock user
  const user = {
    id: 1,
    username: "Matthew",
    email: "matthew@gmail.com"
  }
  // Asynchronous Sign with default
  jwt.sign({user}, "somesauce", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token
    });
  });
});


function verifyToken(req, res, next) {
  // Get authorization header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if(typeof bearerHeader !== undefined) {
    // Split at the space, then get token
    const bearerToken = bearerHeader.split(" ")[1];
    token = bearerToken;
    // Next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

