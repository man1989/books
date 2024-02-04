import express from "express";
import db from "./services/db.js";


const app = express();


(async () => {
    await db.connect();
    app.listen(3033)
})();
