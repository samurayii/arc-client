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
    
        const projects_url = `${config.keys.url}/v1/projects`;

        logger.log(`Request: ${chalk.yellow("GET")} ${chalk.grey(projects_url.replace(/\:\/\/.*\:.*@/i, "://xxxxx:xxxxx@"))}`, "dev");

        const projects_response = await fetch(projects_url);

        if (projects_response.status !== 200) {
            logger.error(`Server return code ${chalk.gray(projects_response.status)}`);
            process.exit(1);
        }
    
        const projects_body = await projects_response.json();

        if (projects_body.status !== "success") {
            logger.error(`Operation status ${chalk.red(projects_body.status)}. ${projects_body.message}`);
            process.exit(1);
        }

        logger.log("List projects:");
    
        for (const item of projects_body.data) {
            logger.log(`  - ${item}`);
        }

    } catch (error) {
        logger.error(`Executing process. ${error}`);
        logger.log(error.stack, "debug");
        process.exit(1);
    }

}