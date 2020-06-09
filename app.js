import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import controllers from "./api/routes";

const env = dotenv.config({ path: "./.env" }).parsed;

const PORT = env.PORT;
const app = express();

app.use(logger("dev"));
app.use(express.json({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

controllers.map((key) => app.use(key));

async function serverStart() {
  try {
    app.listen(PORT, () => {
      console.log("App has been started " + PORT);
    });
  } catch (e) {
    console.warn("Server Error", e.message);
    process.exit(1);
  }
}

serverStart();
