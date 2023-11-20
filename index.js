// const connnectToDb = require("./db");
// const cors = require("cors");
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const app = express();

// const port = 4000;

// connnectToDb();

// app.use(express.json());
// app.use(cors());
// app.use(cookieParser()); //using cookie parser
// app.use(bodyParser.urlencoded({ extended: true }));

// const userRoutes = require("./routes/userRoute");

// app.use("/api", userRoutes);

// app.listen(port, () => {
//   console.log(`server running at "http://localhost/${port}" `);
// });

const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const getGoogleSheetsData = async (range) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const spreadsheetId = "1dqgEz77W4Z2DEsD5vRB24lDA128ds-G8IjoCfavauKY";

  const data = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });

  return data.data;
};

app.get("/api/manpower", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("Manpower");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/license", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("Licenses");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/lap_instrument", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("Lap Instrument");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/general_instrument", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("General Instrument List");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/general_list", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("General List");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/ward_wise_stock", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("ward_wise_stock");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/capexMedical", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("Equipments");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/infrastructure", async (req, res) => {
  try {
    const data = await getGoogleSheetsData("infrastructure");
    res.send(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(1337, (req, res) => {
  console.log("running on 1337");
});
