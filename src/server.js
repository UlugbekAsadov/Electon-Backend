import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 9000;

app.listen(() => console.log(`server is running on PORT: ${PORT}`));
