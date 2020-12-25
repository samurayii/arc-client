import { ILogger } from "logger-flx";
import { IAppConfig } from "../../entry";
import fetch from "node-fetch";
import * as chalk from "chalk";

export async function list (config: IAppConfig, logger: ILogger): Promise<void> {

    try {

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

        const reports_url = `${config.keys.url}/v1/project/${config.keys.project_name}/reports`;

        logger.log(`Request: ${chalk.yellow("GET")} ${chalk.grey(reports_url.replace(/\:\/\/.*\:.*@/i, "://xxxxx:xxxxx@"))}`, "dev");

        const reports_response = await fetch(reports_url);

        if (reports_response.status !== 200) {
            logger.error(`Server return code ${chalk.gray(reports_response.status)}`);
            process.exit(1);
        }
    
        const reports_body = await reports_response.json();

        if (reports_body.status !== "success") {
            logger.error(`Operation status ${chalk.red(reports_body.status)}. ${reports_body.message}`);
            process.exit(1);
        }

        logger.log("List reports:");
    
        for (const item of reports_body.data) {
            logger.log(`  - ${item}`);
        }

    } catch (error) {
        logger.error(`Executing process. ${error}`);
        logger.log(error.stack, "debug");
        process.exit(1);
    }

}