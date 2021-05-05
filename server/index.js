require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');
const upload = multer();
const path = require('path');
const port = process.env.PORT || 3000;


const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

global.__basedir = __dirname;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(upload.array()); 

require("./config/routes")(app);


app.use(express.static(path.resolve('../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../client')+'/build/index.html');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
