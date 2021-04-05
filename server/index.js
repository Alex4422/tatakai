const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");
const swaggerConfig = require("./config/swagger.config.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const multer = require('multer');
const upload = multer();
const specs = swaggerJsdoc(swaggerConfig);
const corsOptions = {
  origin: "http://localhost:3000",
};

global.__basedir = __dirname;

// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(upload.array()); 

require("./routes/card.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
