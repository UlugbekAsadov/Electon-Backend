import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.listen(() => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err))
    .then(() => console.log("Dasabase connected"));

  console.log(`server is running on PORT: ${PORT}`);
});
