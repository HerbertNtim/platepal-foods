import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

// ROUTES

// CONFIGURATIONS
dotenv.config();

const isProduction = process.env.NODE_ENV !== "production";

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (isProduction) {
    console.log(`Server is running on port ${PORT}`);
  }
});
