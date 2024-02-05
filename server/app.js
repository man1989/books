import express from "express";
import config from "./config/index.js";
import db from "./db/index.js";


const app = express();
db.connect();
db.migrate();
app.listen(config.port);
