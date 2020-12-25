import { ILogger } from "logger-flx";
import { IAppConfig } from "../entry";
import { list } from "./lib/list";
import { exist } from "./lib/exist";
import { get } from "./lib/get";
import { send } from "./lib/send";
import { harvest } from "./lib/harvest";
import { delete_reports } from "./lib/delete_reports";

export function reports (config: IAppConfig, logger: ILogger): void {

    if (config.action === "list") {
        list(config, logger);
    }

    if (config.action === "exist") {
        exist(config, logger);
    }

    if (config.action === "delete") {
        delete_reports(config, logger);
    }

    if (config.action === "send") {
        send(config, logger);
    }

    if (config.action === "harvest") {
        harvest(config, logger);
    }

    if (config.action === "get") {
        get(config, logger);
    }

}