const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(cors());

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
    console.log(geoResponse.data[0].name);
    const latitude = geoResponse.data[0].latitude;
    const longitude = geoResponse.data[0].longitude;
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&past_days=7`
    );
    res.json(response.data);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
