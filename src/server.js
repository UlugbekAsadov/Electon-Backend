import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import registerloginrouter from "./routers/auth.router.js";
import { sessionMiddleware } from "./middleware/session.js";
import { errorHandler } from "./middleware/errorheadler.js";
import { notfound } from "./middleware/notfound.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(sessionMiddleware);

const PORT = process.env.PORT || 9000;

app.use("/api", registerloginrouter);

app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/beckend", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err))
    .then(() => console.log("Dasabase connected"));
  console.log(`server is running on PORT: ${PORT}`);
});
