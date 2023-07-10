const express = require("express");
const cors = require("cors");
const axios = require("axios");
const admin = require("firebase-admin");
const app = express();
require("dotenv").config();
const port = 3001;

app.use(cors());

const serviceAccount = require("./sensitive/serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://weather-d33fe-default-rtdb.firebaseio.com/", // Replace with your database URL
});

const db = admin.database();

app.get("/weather/:country/:city", async (req, res) => {
  const city = req.params.city;
  const country = req.params.country;
  const config = {
    headers: { "X-Api-Key": process.env.API_NINJAS_API_KEY },
  };
  try {
    const geoResponse = await axios.get(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,
      config
    );
    const latitude = geoResponse.data[0].latitude;
    const longitude = geoResponse.data[0].longitude;
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m&temperature_unit=fahrenheit&past_days=7`
    );
    console.log(response.data);
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
    let avgHum = 0,
      avgWind = 0,
      avgPre = 0;
    for (i in temps.relativehumidity_2m) {
      avgHum += parseInt(temps.relativehumidity_2m[i]);
    }
    avgHum /= temps.relativehumidity_2m.length;

    for (i in temps.windspeed_10m) {
      avgWind += parseInt(temps.windspeed_10m[i]);
    }
    avgWind /= temps.windspeed_10m.length;

    for (i in temps.precipitation_probability) {
      avgPre += parseInt(temps.precipitation_probability[i]);
    }
    avgPre /= temps.precipitation_probability.length;
    let extraData = {
      humidity: Math.round(avgHum),
      wind: Math.round(avgWind),
      precipitation: Math.round(avgPre),
    };
    res.json({ data, extraData });
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.get("/news/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.NEWS_API_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news data" });
  }
});

app.get("/claude", async (req, res) => {
  let claudeIn = "Summarize all of the following news into one article.\n{\n";
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
  const pythonProcess = spawn("python", ["./claude_api.py", claudeIn]);

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
