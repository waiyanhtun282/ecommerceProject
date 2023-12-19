const mongodb = require("mongodb");
const MongodbClient = mongodb.MongoClient;
// password=  kXrQoDlMhpP22ci5
let _db;
// const url = 
const mongoConnect = (callback) => {
  MongodbClient.connect(
    'mongodb+srv://waiyanhtun282:kXrQoDlMhpP22ci5@cluster0.hqcwcpc.mongodb.net/?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found!";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
