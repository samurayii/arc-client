import { ILogger } from "logger-flx";
import { IAppConfig } from "../entry";
import { list } from "./lib/list";
import { exist } from "./lib/exist";
import { delete_project } from "./lib/delete_project";

export function projects (config: IAppConfig, logger: ILogger): void {

    if (config.action === "list") {
        list(config, logger);
    }

    if (config.action === "exist") {
        exist(config, logger);
    }

    if (config.action === "delete") {
        delete_project(config, logger);
    }

}