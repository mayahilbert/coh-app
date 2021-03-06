const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const db = require("./config/keys").mongoURI;
const PORT = process.env.PORT || 5000;

const passport = require("passport");

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");
const tallies = require("./routes/api/tallies");



app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:cis5800@cluster0-a2fzl.mongodb.net/coh?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
  app.use(passport.initialize());

  // Passport config
  require("./config/passport")(passport);

  // Routes
  app.use("/api/users", users);
  app.use('/task-list', tasks);
  app.use('/tally-list', tallies);


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



// mongoose.connect('mongodb+srv://admin:cis5800@cluster0-a2fzl.mongodb.net/coh?retryWrites=true', {
//   useNewUrlParser: true
// })
// .then(() => console.log('MongoDB successfully connected'))
// .catch((err) => console.log(err));

const connection = mongoose.connection;


connection.once('open', function() {
  console.log("MongoDB database connection is open");
})

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
