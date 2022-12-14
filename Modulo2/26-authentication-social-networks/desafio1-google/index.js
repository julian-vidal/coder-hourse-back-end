const express = require('express');
const app = express();
const passport = require('passport');
const authMiddleware = require('./middleware');
const hbs = require('./handlebars.engine');
require('./passport');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views/pages");

const PORT = 8000;

const MongoStore = require('connect-mongo');
const session = require('express-session');
app.use(session({
    secret: 'STRING_TO_SIGN_SESSION_ID',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: 'mongodb://localhost:27017/sessions',
      retries: 0,
      ttl: 60 * 60 * 24, // 1 day
    }),
  })
);

// USE PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session)

app.get("/", (req, res) => {
  res.redirect('/profile');
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});


app.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/login"
}), (req,res) => {
  res.redirect("/profile")
})
app.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}))

// app.get("/signup", (req, res) => {
//   res.sendFile(__dirname + "/public/signup.html");
// });

app.get("/profile", authMiddleware,(req, res) => {
  res.render(__dirname + "/views/pages/profile", { user: req.session.user});
});

app.post("/logout", (req, res) => {
  req.logout(()=> { // Logout from passport - Method agregado a request object
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Server listening :: http://localhost:${PORT}`);
});