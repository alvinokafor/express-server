const path = require("path");
const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

app.use(logger);

//CORS config
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === "http://localhost:5000" || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS Policy"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
