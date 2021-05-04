require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');
const upload = multer();


const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

global.__basedir = __dirname;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(upload.array()); 

require("./config/routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
