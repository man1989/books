import vm from "node:vm";
import {readFileSync, statSync } from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

const environment = process.env.ENVIRONMENT || "dev"

function config(){
    let configScript = "{}";
    console.log(path.resolve(__dirname, "dev.config.js"));
    if (environment.toLocaleLowerCase().indexOf("dev")>=0) {
        const devConfigPath = path.resolve(__dirname, "dev.config.js")
        console.log(statSync(devConfigPath, {throwIfNoEntry: false}))
        configScript = readFileSync(devConfigPath);
    } else {
        const prodConfigPath = path.resolve(__dirname, "prod.config.js")
        configScript = readFileSync(prodConfigPath);
    }
    vm.Module
    let script = new vm.SourceTextModule('import config from "./dev.config.js');
    let context = {};
    script.runInContext(context)
    console.log(context);
}


export default config();

