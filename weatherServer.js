const express = require("express");
const morgan = require("morgan");
const axios = require("axios").default;
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;
const thirdPartyApiKey = process.env.WEATHER_API_KEY;
const baseURL = "http://api.weatherbit.io/v2.0/current";

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude) {
      return res.status(400).json({ error: "latitude parameter is mandatory" });
    }
    if (!longitude) {
      return res
        .status(400)
        .json({ error: "longitude parameter is mandatory" });
    }

    const response = await axios(baseURL, {
      params: {
        key: thirdPartyApiKey,
        lat: latitude,
        lon: longitude,
      },
      responseType: "json",
    });

    const [weatherData] = response.data.data;
    const {
      city_name,
      temp,
      weather: { description },
    } = weatherData;

    res.json({ city_name, temp, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
