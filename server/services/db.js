import config from "../config/index.js";
import postgres from "postgres";

console.log("configPromise: ", configPromise);

class DB {
    constructor() {
        console.log();
    }
    async connect() {
        console.log(config);
        // postgres(`postgres://${config}`);
    }
}

export default new DB();