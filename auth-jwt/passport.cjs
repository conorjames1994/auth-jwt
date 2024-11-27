const JwtStrategy = require("passport-jwt").Strategy
const passport = require("passport");
const UserModel = require("./db.cjs");

    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretthatshouldbeinaenvfile";



passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  let user;
    try {
      user = await UserModel.findOne({_id: jwt_payload.id});
      
      if (!user) { 
        return done(null, false)
       }
       return done(null, user)
    } catch (error) {
      console.log(error);
      return done(null, false)
    }
  
  // const user = await UserModel.findOne({_id: jwt_payload.id});
  // console.log(user)
  //   UserModel.findOne({id: jwt_payload.id}, function(err, user) {
  //       if (err) {
  //           return done(err, false);
  //       }
  //       if (user) {
  //           return done(null, user);
  //       } else {
  //           return done(null, false);
  //           // or you could create a new account
  //       }
  //   });
}));