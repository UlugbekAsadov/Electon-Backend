import path from "path";
import fs from "fs";
import { ERROR_MESSAGES } from "../utils/enums/error-messages.js";
import { fileURLToPath } from "url";

const __dirname = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../"
);

export function errorHandler(err, req, res, next) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: err.message.replace(/\\n/g, "\n\t"),
    stack: err.stack,
  };
  const logFilePath = path.join(__dirname, "log.txt");
  const logMessage = `${JSON.stringify(errorLog, null, "\t")}\n`;

  fs.appendFile(logFilePath, logMessage, (appendErr) => {
    if (appendErr) {
      console.error("Error An error occurred while saving", appendErr);
    }
  });
  console.log(err);
  res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR });
}


