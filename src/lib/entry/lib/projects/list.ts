import { Command } from "commander";
import { IAppConfig } from "../../interfaces";
import * as chalk from "chalk";

export function list (options: Command, config: IAppConfig): void {

    config.action = "list";
    config.keys.url = options.url;
    config.logs = options.logs;

    if (process.env["ARC_CLIENT_LOGS"] !== undefined) {
        config.logs = process.env["ARC_CLIENT_LOGS"];
    }

    if (process.env["ARC_CLIENT_URL"] !== undefined) {
        config.keys.url = process.env["ARC_CLIENT_URL"];
    }

    let error_flag = false;

    if (config.keys.url === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --url, -u ")}`);
        error_flag = true;
    }

    if (error_flag === true) {
        process.exit(1);
    }

    config.keys.url = config.keys.url.trim().replace(/\/$/, "");
    config.logs = config.logs.trim().toLowerCase();

}