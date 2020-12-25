import { Command } from "commander";
import { IAppConfig } from "../../interfaces";
import * as chalk from "chalk";

export function list (options: Command, config: IAppConfig): void {

    config.action = "list";

    if (process.env["ARC_CLIENT_LOGS"] !== undefined) {
        options.logs = process.env["ARC_CLIENT_LOGS"];
    }

    if (process.env["ARC_CLIENT_URL"] !== undefined) {
        options.url = process.env["ARC_CLIENT_URL"];
    }

    let error_flag = false;

    if (options.url === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --url, -u ")}`);
        error_flag = true;
    }

    if (error_flag === true) {
        process.exit(1);
    }

    config.keys.url = options.url.trim().replace(/\/$/, "");
    config.logs = options.logs.trim().toLowerCase();

}