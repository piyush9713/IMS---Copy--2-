import morgan from "morgan";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Log HTTP requests
const httpLogger = morgan("combined", {
  stream: { write: (message) => logger.info(message.trim()) },
});

export { logger, httpLogger };
