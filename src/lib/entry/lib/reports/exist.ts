import { Command } from "commander";
import { IAppConfig } from "../../interfaces";
import * as chalk from "chalk";

export function exist (options: Command, config: IAppConfig): void {

    config.action = "exist";

    if (process.env["ARC_CLIENT_LOGS"] !== undefined) {
        options.logs = process.env["ARC_CLIENT_LOGS"];
    }

    if (process.env["ARC_CLIENT_URL"] !== undefined) {
        options.keys.url = process.env["ARC_CLIENT_URL"];
    }

    if (process.env["ARC_CLIENT_PROJECT_NAME"] !== undefined) {
        options.keys.project_name = process.env["ARC_CLIENT_PROJECT_NAME"];
    }

    if (process.env["ARC_CLIENT_REPORT_NAME"] !== undefined) {
        options.keys.report_name = process.env["ARC_CLIENT_REPORT_NAME"];
    }

    let error_flag = false;

    if (options.project_name === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --project_name, -pn ")}`);
        error_flag = true;
    }

    if (options.report_name === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --report_name, -rn ")}`);
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
    config.keys.report_name = options.report_name.trim();
    config.logs = options.logs.trim().toLowerCase();

}