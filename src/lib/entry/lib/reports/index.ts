import { Command, program } from "commander";
import { IAppConfig } from "../../interfaces";
import { list } from "./list";
import { exist } from "./exist";
import { send } from "./send";
import { harvest } from "./harvest";
import { delete_report } from "./delete_report";
import { get } from "./get";

export function reports (prog: typeof program, config: IAppConfig): void {

    const cli_command = prog.command("reports <command>")
    .addHelpCommand(false)
    .description("work with allure-report-center reports")
    .usage("[command]");

    cli_command.command("list")
    .description("list allure-report-center reports")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .action((options: Command) => {
        config.scope = "reports";
        list(options, config);
    });

    cli_command.command("exist")
    .description("check exist reports on allure-report-center")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .option("-rn, --report_name <type>", "Name of report (Environment variable: ARC_CLIENT_REPORT_NAME=<type>). Example: --report_name 1c2d420c-b243-455e-becb-92c25cc23b39-testsuite.xml")
    .action((options: Command) => {
        config.scope = "reports";
        exist(options, config);
    });

    cli_command.command("delete")
    .description("delete reports on allure-report-center")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .option("-rn, --report_name <type>", "Name of report (Environment variable: ARC_CLIENT_REPORT_NAME=<type>). Example: --report_name 1c2d420c-b243-455e-becb-92c25cc23b39-testsuite.xml")
    .action((options: Command) => {
        config.scope = "reports";
        delete_report(options, config);
    });

    cli_command.command("send")
    .description("send report to allure-report-center")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .option("-rp, --report_path <type>", "Path to report file (Environment variable: ARC_CLIENT_REPORT_PATH=<type>). Example: --report_path ./1c2d420c-b243-455e-becb-92c25cc23b39-testsuite.xml")
    .action((options: Command) => {
        config.scope = "reports";
        send(options, config);
    });

    cli_command.command("harvest")
    .description("send report to allure-report-center")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .option("-fp, --folder_path <type>", "Path to reports folder (Environment variable: ARC_CLIENT_FOLDER_PATH=<type>). Example: --folder_path ./allure-results")
    .action((options: Command) => {
        config.scope = "reports";
        harvest(options, config);
    });

    cli_command.command("get")
    .description("get report to allure-report-center")
    .option("-u, --url <type>", "Url to allure-report-center (Environment variable: ARC_CLIENT_URL=<type>). Example: --url https://user:password@allure-report-center:3001/prefix")
    .option("-l, --logs <type>", "Logs details, can be none, none, prod, dev or debug (Environment variable: ARC_CLIENT_LOGS=<type>). Example: --logs prod", "prod")
    .option("-pn, --project_name <type>", "Name of project (Environment variable: ARC_CLIENT_PROJECT_NAME=<type>). Example: --project_name dev")
    .option("-rn, --report_name <type>", "Name report file on server (Environment variable: ARC_CLIENT_REPORT_NAME=<type>). Example: --report_name 1c2d420c-b243-455e-becb-92c25cc23b39-testsuite.xml")
    .option("-o, --output <type>", "Path to output report file (Environment variable: ARC_CLIENT_OUTPUT=<type>). Example: --output ./1c2d420c-b243-455e-becb-92c25cc23b39-testsuite.xml")
    .action((options: Command) => {
        config.scope = "reports";
        get(options, config);
    });

    

}