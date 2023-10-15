const connnectToDb = require("./db");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

const port = 4000;

connnectToDb();

app.use(express.json());
app.use(cors());
app.use(cookieParser()); //using cookie parser
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoute");

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`server running at "http://localhost/${port}" `);
});
