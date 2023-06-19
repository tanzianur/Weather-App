const express = require("express");
const cors = require("cors");
const axios = require("axios");
const admin = require("firebase-admin");
const app = express();
const port = 3001;

app.use(cors());

const serviceAccount = require("./weather-app-324a2-firebase-adminsdk-v0fsg-c1cf7a1eb9.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://weather-app-324a2-default-rtdb.firebaseio.com/", // Replace with your database URL
});

const db = admin.database();

app.get("/weather/:country/:city", async (req, res) => {
  const city = req.params.city;
  const country = req.params.country;
  const config = {
    headers: { "X-Api-Key": "Ap3kZ2YbCi2Ijiz2p5O1eg==deSXcHfGihp2bhiY" },
  };
  try {
    const geoResponse = await axios.get(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,
      config
    );
    const latitude = geoResponse.data[0].latitude;
    const longitude = geoResponse.data[0].longitude;
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&past_days=7`
    );
    const response2 = await axios.get(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5&past_days=7`
    );
    let quality = response2.data.hourly.pm2_5;
    let temps = response.data.hourly;
    let data = [];
    for (i in temps.time) {
      data.push({
        id: i,
        day: temps.time[i],
        temperature: temps.temperature_2m[i],
        air: quality[i],
      });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.get("/news/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${keyword}&apiKey=b44088fadae04feb83049f2e048dc855`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news data" });
  }
});

app.get("/claude", async (req, res) => {
  let claudeIn = "Summarize the following.\n{\n";
  try {
    let reference = db.ref("data/news");
    const snapshot = await reference.once("value");
    const data = snapshot.val();
    let desc = "";
    for (var i = 0; i < data.length; i++) {
      desc += data[i].description + "\n";
    }
    claudeIn += desc + "}";
  } catch (error) {
    console.log("ERROR: " + error);
  }

  const { spawn } = require("child_process");

  // Execute Python script with command-line arguments
  const pythonProcess = spawn("python", ["./test.py", claudeIn]);

  // Handle output from the Python script
  pythonProcess.stdout.on("data", (data) => {
    // Process data received from Python
    console.log("Claude finished");
    res.json(data.toString());
  });

  // Handle errors, if any
  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
