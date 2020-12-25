import { ILogger } from "logger-flx";
import { IAppConfig } from "../../entry";
import fetch from "node-fetch";
import * as chalk from "chalk";

export async function exist (config: IAppConfig, logger: ILogger): Promise<void> {

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
    
        const projects_body = await project_response.json();

        if (projects_body.status !== "success") {
            logger.error(`Operation status ${chalk.red(projects_body.status)}. ${projects_body.message}`);
            process.exit(1);
        }

        if (projects_body.data === true) {
            logger.log(chalk.green("Project exist"));
        } else {
            logger.log(chalk.red("Project not exist"));
        }

    } catch (error) {
        logger.error(`Executing process. ${error}`);
        logger.log(error.stack, "debug");
        process.exit(1);
    }

}