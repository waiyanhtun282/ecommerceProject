const path = require("path");
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const mongoConnect = require('./util/database').mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65847463df6d5086db740284")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.fwlvfnp.mongodb.net/Shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      // console.log(user);
      if (!user) {
        const user = new User({
          name: "Leo",
          email: "leo@gamil.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
