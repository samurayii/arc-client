import { Command } from "commander";
import { IAppConfig } from "../../interfaces";
import * as chalk from "chalk";

export function harvest (options: Command, config: IAppConfig): void {

    config.action = "harvest";

    if (process.env["ARC_CLIENT_LOGS"] !== undefined) {
        options.logs = process.env["ARC_CLIENT_LOGS"];
    }

    if (process.env["ARC_CLIENT_URL"] !== undefined) {
        options.url = process.env["ARC_CLIENT_URL"];
    }

    if (process.env["ARC_CLIENT_PROJECT_NAME"] !== undefined) {
        options.project_name = process.env["ARC_CLIENT_PROJECT_NAME"];
    }

    if (process.env["ARC_CLIENT_FOLDER_PATH"] !== undefined) {
        options.folder_path = process.env["ARC_CLIENT_FOLDER_PATH"];
    }

    let error_flag = false;

    if (options.project_name === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --project_name, -pn ")}`);
        error_flag = true;
    }

    if (options.folder_path === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --folder_path, -rn ")}`);
        error_flag = true;
    }

    if (options.url === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --url, -u ")}`);
        error_flag = true;
    }

    if (error_flag === true) {
        process.exit(1);
    }

    config.keys.url = options.url.trim().replace(/\/$/, "");
    config.keys.project_name = options.project_name.trim();
    config.keys.folder_path = options.folder_path.trim();
    config.logs = options.logs.trim().toLowerCase();

}