const cors = require("cors");
const express = require("express");
const app = express();
const UserModel = require("./db.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport")
require("./passport.cjs")

//app.use section
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());

//routes

app.post("/register", (req, res) => {
//create user model instance
const user = new UserModel({
  username: req.body.username,
  password: bcrypt.hashSync(req.body.password, 10)
})

if(user){
user.save().then((user) => {
res.status(200).send({message: "Success", user: {userId: user._id, username: user.username}})
}
);
}
else{
  res.status(400).send("error user input")
}

})

app.post("/login", async (req, res) => {
  let user;
    try {
      user = await UserModel.findOne({ username: req.body.username });
      
      if (!user) { 
        return res.status(404).send("user not found")
       }
    } catch (error) {
      console.log(error);
    }
    let match = await bcrypt.compareSync(req.body.password, user.password)

    if (!match) { 
      return res.status(404).send("Password doesnt match user's")
     }
     const payload = {
      id: user._id,
      username: user.username,

     }
      const token = jwt.sign(payload, "secretthatshouldbeinaenvfile", {expiresIn: "1d"})
      //jwt.sign(payload, secretOrPrivateKey, [options, callback]) returns a jwt token after authorisation.
      return res.status(200).send({
        message: "logged in successfully",
        token: "Bearer " + token, //this is just the standard way of passing a token.
      })
  })
// login basically makes the token, but passport.js has to verify them..

app.get("/protected", passport.authenticate("jwt", {session: false}), (req, res) => {
  return res.status(200).send({
    message: "This area is for authenticated users",
    user: {username: req.user.username, id: req.user._id}
  })
})

//run server
app.listen(5000, () => {
  console.log("server listening to port 5000")
})