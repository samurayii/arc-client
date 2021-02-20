import { ILogger } from "logger-flx";
import { IAppConfig } from "../../entry";
import fetch from "node-fetch";
import * as chalk from "chalk";
import * as fs from "fs";
import * as path from "path"; 

export async function send (config: IAppConfig, logger: ILogger): Promise<void> {

    try {

        const full_report_path = path.resolve(process.cwd(), config.keys.report_path);

        if (fs.existsSync(full_report_path) === false) {
            logger.error(`Report file ${chalk.gray(full_report_path)} not found`);
            process.exit(1);
        }

        const body = fs.readFileSync(full_report_path);
        const report_name = path.basename(full_report_path);

        const ping_url = `${config.keys.url}/_ping`;

        logger.log(`Request: ${chalk.yellow("GET")} ${chalk.grey(ping_url.replace(/\:\/\/.*\:.*@/i, "://xxxxx:xxxxx@"))}`, "dev");
    
        const ping_response = await fetch(ping_url);
   
        if (ping_response.status !== 200) {
            logger.error("Server is not available");
            process.exit(1);
        }
    
        const project_url = `${config.keys.url}/v1/project/${config.keys.project_name}/exist`;

        logger.log(`Request: ${chalk.yellow("GET")} ${chalk.grey(project_url.replace(/\:\/\/.*\:.*@/i, "://xxxxx:xxxxx@"))}`, "dev");

        const project_response = await fetch(project_url);

        if (project_response.status !== 200) {
            logger.error(`Server return code ${chalk.gray(project_response.status)}`);
            process.exit(1);
        }
    
        const project_body = await project_response.json();

        if (project_body.status !== "success") {
            logger.error(`Operation status ${chalk.red(project_body.status)}. ${project_body.message}`);
            process.exit(1);
        }

        if (project_body.data === false) {
            logger.error(`Project ${chalk.red(config.keys.project_name)} not found`);
            process.exit(1);
        }

        const report_url = `${config.keys.url}/v1/project/${config.keys.project_name}/report/${report_name}`;

        logger.log(`Request: ${chalk.yellow("POST")} ${chalk.grey(report_url.replace(/\:\/\/.*\:.*@/i, "://xxxxx:xxxxx@"))}`, "dev");

        const report_response = await fetch(report_url, {
            method: "post",
            body: body
        });

        if (report_response.status !== 200) {
            logger.error(`Server return code ${chalk.gray(report_response.status)}`);
            process.exit(1);
        }
    
        const report_body = await report_response.json();

        if (report_body.status !== "success") {
            logger.error(`Operation status ${chalk.red(report_body.status)}. ${report_body.message}`);
            process.exit(1);
        } else {
            logger.log(chalk.green(`Report ${report_name} posted`));
        }

    } catch (error) {
        logger.error(`Executing process. ${error}`);
        logger.log(error.stack, "debug");
        process.exit(1);
    }

}