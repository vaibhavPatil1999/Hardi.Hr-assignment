require("dotenv").config();
const port = 5000;
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(express.json());
const routes = require("./routes/routes");
app.use("/api", routes);
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
