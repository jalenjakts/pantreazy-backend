require("dotenv").config({ path: "api/.env"});
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

// importing user context
const User = require("./model/user");

// Register
app.post("/register", async (req, res) => {
/*   try {
    // Get user input
    const { first_name, last_name, email, username, password, date_of_birth } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name && username)) {
      res.status(400).send("Include all of the following. First name, last name, email, and password.");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      username,
      date_of_birth,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  } */
});

// Login
app.post("/login", (req, res) => {
// our login logic goes here
});
module.exports = app;