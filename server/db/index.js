import config from "../config/index.js";
import path from "node:path";
import postgres from "postgres";
import {readdirSync, statSync} from "node:fs";

console.log(path.resolve(config.baseDir, "db/migrations"));
const migrations = readdirSync(path.resolve(config.baseDir, "db/migrations"));
console.log(migrations)
class DB {
    #sql;
    connect() {
        console.log("config.db: ", config.db);
        if(!this.#sql){
            const {
                username,
                password,
                hostname,
                port,
                database
            } = config.db;
            
            const dbUrl = `postgres://${username}:${password}@${hostname}:${port}/${database}`;
            console.log(dbUrl);
            this.#sql = postgres(dbUrl);
        }
        return this.#sql;
    }
    async migrate(){
        for(let migration of migrations){
            const {default: migrationModule} = await import(path.resolve(config.baseDir, `db/migrations/${migration}`));
            const module = new migrationModule(this.#sql, migration);
            await module.run();
        }
    }
}

export default new DB();