const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const recordsRoutes = require('./routes/records');

mongoose.connect("mongodb+srv://alexAdmin:h3xx0PABA..@clustervirginia-xhhvp.mongodb.net/chiron_dev", { useNewUrlParser: true })
  .then(() => {
    console.log("connection successfull");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/contact", messageRoutes);
app.use("/api/chart", recordsRoutes);

module.exports = app;
