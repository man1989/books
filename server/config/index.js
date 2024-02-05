import vm from "node:vm";
import {readFileSync, statSync} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const environment = process.env.ENVIRONMENT || "dev"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



function getConfig(){
    console.log(path.resolve(__dirname, "dev.config.js"));
    let configScript;
    if (environment.toLocaleLowerCase().indexOf("dev")>=0) {
        const devConfigPath = path.resolve(__dirname, "dev.config.js");
        configScript = readFileSync(devConfigPath);
    } else {
        const prodConfigPath = path.resolve(__dirname, "prod.config.js")
        configScript = readFileSync(prodConfigPath);
    }
    const config = new Function(`return ${configScript.toString()}`)()();
    config.__dirname = __dirname;
    config.__dirname = __filename;
    Object.defineProperties(config, {
        "baseDir": {
            enumerable: false,
            get(){
                return path.resolve(__dirname, "../")
            },
        }
    });
    return config;
}


export default getConfig();

