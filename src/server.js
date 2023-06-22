import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import registerloginrouter from "./routers/auth.router.js";
import uploadFilerouter from "./routers/upload.router.js";
import { sessionMiddleware } from "./middleware/session.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notfound } from "./middleware/notfound.js";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
const __dirname = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../"
);
dotenv.config({ path: __dirname + ".env" });
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(sessionMiddleware);

const PORT = process.env.PORT || 9000;

app.use("/api", registerloginrouter);
app.use("/api", uploadFilerouter);

app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Dasabase connected"))
    .catch((err) => console.log(err));
  console.log(`server is running on PORT: ${PORT}`);
});
