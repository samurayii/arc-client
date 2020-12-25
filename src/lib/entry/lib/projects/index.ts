import { Command, program } from "commander";
import { IAppConfig } from "../../interfaces";
import { list } from "./list";
import { exist } from "./exist";
import { delete_project } from "./delete_project";

export function projects (prog: typeof program, config: IAppConfig): void {

    const cli_command = prog.command("projects <command>")
    .addHelpCommand(false)
    .description("work with allure-report-center projects")
    .usage("[command]");

    cli_command.command("list")
    .description("list allure-report-center projects")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .action((options: Command) => {
        config.scope = "projects";
        list(options, config);
    });

    cli_command.command("exist")
    .description("check exist project on allure-report-center")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .action((options: Command) => {
        config.scope = "projects";
        exist(options, config);
    });

    cli_command.command("delete")
    .description("delete project on allure-report-center")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .action((options: Command) => {
        config.scope = "projects";
        delete_project(options, config);
    });

}