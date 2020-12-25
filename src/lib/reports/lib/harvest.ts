import { ILogger } from "logger-flx";
import { IAppConfig } from "../../entry";
import fetch from "node-fetch";
import * as chalk from "chalk";
import * as fs from "fs";
import * as path from "path"; 

const getXmlFilesList = (folder: string, files_list: string[]  = []) => {

    const files = fs.readdirSync(folder);

    files.forEach( (file_path) => {

        const full_file_path = path.resolve(folder, file_path);
        const stat = fs.statSync(full_file_path);

        if (stat.isFile()) {
            if (/\.xml$/.test(file_path)) {
                files_list.push(full_file_path);
            }
        } else {
            getXmlFilesList(full_file_path, files_list);
        }

    });

    return files_list;

};

export async function harvest (config: IAppConfig, logger: ILogger): Promise<void> {

    try {

        const full_folder_path = path.resolve(process.cwd(), config.keys.folder_path);

        if (fs.existsSync(full_folder_path) === false) {
            logger.error(`Reports folder ${chalk.gray(full_folder_path)} not found`);
            process.exit(1);
        }

        const ping_url = `${config.keys.url}/_ping`;

        logger.log(`Request: ${chalk.yellow("GET")} ${chalk.grey(ping_url.replace(/\:\/\/.*\:.*@/i, "://xxxxx:xxxxx@"))}`, "dev");
    
        const ping_response = await fetch(ping_url);
   
        if (ping_response.status !== 200) {
            logger.error("Server is not available");
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

        const files = getXmlFilesList(full_folder_path);

        logger.log("Harvesting ...");

        for (const full_file_path of files) {

            const body = fs.readFileSync(full_file_path).toString();
            const report_name = path.basename(full_file_path);

            if (reports_body.data.includes(report_name) === true) {
                logger.log(`Report ${chalk.gray(report_name)} already exist on server`, "dev");
                continue;
            }

            logger.log(`Sending report ${chalk.gray(report_name)} to server`, "dev");

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
                logger.log(`Report ${chalk.gray(report_name)} posted to server`, "dev");
            }

        }

        logger.log("Harvesting complete");

    } catch (error) {
        logger.error(`Executing process. ${error}`);
        logger.log(error.stack, "debug");
        process.exit(1);
    }

}