import { Command } from "commander";
import { IAppConfig } from "../../interfaces";
import * as chalk from "chalk";

export function exist (options: Command, config: IAppConfig): void {

    config.action = "exist";
    config.keys.url = options.url;
    config.keys.project_name = options.project_name;
    config.logs = options.logs;

    if (process.env["ARC_CLIENT_LOGS"] !== undefined) {
        config.logs = process.env["ARC_CLIENT_LOGS"];
    }

    if (process.env["ARC_CLIENT_URL"] !== undefined) {
        config.keys.url = process.env["ARC_CLIENT_URL"];
    }

    if (process.env["ARC_CLIENT_PROJECT_NAME"] !== undefined) {
        config.keys.project_name = process.env["ARC_CLIENT_PROJECT_NAME"];
    }

    if (process.env["ARC_CLIENT_REPORT_NAME"] !== undefined) {
        config.keys.report_name = process.env["ARC_CLIENT_REPORT_NAME"];
    }

    let error_flag = false;

    if (config.keys.project_name === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --project_name, -pn ")}`);
        error_flag = true;
    }

    if (config.keys.report_name === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --report_name, -rn ")}`);
        error_flag = true;
    }

    if (config.keys.url === undefined) {
        console.error(`${chalk.red("[ERROR]")} Not set required key: ${chalk.white.bold.bgGray(" --url, -u ")}`);
        error_flag = true;
    }

    if (error_flag === true) {
        process.exit(1);
    }

    config.keys.url = config.keys.url.trim().replace(/\/$/, "");
    config.keys.project_name = config.keys.project_name.trim();
    config.keys.report_name = config.keys.report_name.trim();
    config.logs = config.logs.trim().toLowerCase();

}