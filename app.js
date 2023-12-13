const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// for databse or sequelize
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// for user middlewar
app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
sequelize
  .sync({ force: true })
  // .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);autoIncrement
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Leo", email: "leo@gmail.com" });
    }
    return user;
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
