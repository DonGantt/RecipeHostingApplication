const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login.ejs", {
    title: "Grandma's Cookbook -- Login",
    user: req.user

  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Grandma's Cookbook -- Create Account",
    user: req.user

  });
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)){
    validationErrors.push({ msg: "Please enter a valid email address." });
  }
    
  if (!validator.isLength(req.body.password, { min: 8 })){
    validationErrors.push({msg: "Password must be at least 8 characters long",});
  }

  if (req.body.password !== req.body.confirmPassword){
    validationErrors.push({ msg: "Passwords do not match" });
  }


  if (validationErrors.length) {
    await req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  console.log(validationErrors)
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //Come back to this and repair it later

  const user = new User({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        console.log("hit on error line")
        return next(err);
      }
      if (existingUser) {
        console.log("exist error")

        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          console.log("unknown error?")
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            console.log("login error")
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};
