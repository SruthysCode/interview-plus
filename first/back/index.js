const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

const jwt = require("jsonwebtoken");
const secretKey = "itssecret";

const users = [{ name: "john", email: "john@gmail.com", password: "123@qwe" }];
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server on port : http://localhost:${PORT}`);
});

app.get("/api/data", (req, res) => {
  console.log("fghj");
  res.send({ data: "wertyui" });
});
app.get("/", (req, res) => {
  
  console.log("dfghjk");
});

app.post("/api/register", (req, res) => {
  
  if (req.body) {
    let emailToCheck = req.body.email;
    if (isUserWithEmailExists(emailToCheck)) {
      console.log(`User with email ${emailToCheck} exists.`);

      res.send({
        status: 400,
        success: false,
        message: "Failed to register user: Email already exists",
      });
    } else {
      users.push(req.body);

      res.send({
        status: 200,
        success: true,
        message: "User registered successfully",
      });
    }
  } else {
    res.send({
      status: 400,
      success: false,
      message: "Failed to register user",
    });
  }
});

function isUserWithEmailExists(email) {
  return users.some((user) => user.email === email);
}

function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

app.get("/api/login", (req, res) => {
  console.log(req.body, " ok");
  if (req.body) {
    let emailToCheck = req.body.email;
    const user=getUserByEmail(emailToCheck);
    if (user) {
        const { name, email, password } = user;
      const token = jwt.sign({ name }, secretKey);

      res.send({
        status: 200,
        success: true,
        message: "User Logged in successfully",
        data : {token, user}});
    } else {
      res.send({
        status: 400,
        success: false,
        message: "Failed to Login",
      });
    }
  } else {
    res.send({
      status: 400,
      success: false,
      message: "Failed to register user",
    });
  }
});
