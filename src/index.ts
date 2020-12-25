#!/usr/bin/env node
import config from "./lib/entry";
import { ILogger, Logger } from "logger-flx";
import { projects } from "./lib/projects";
import { reports } from "./lib/reports";

let logger: ILogger;

if (config.logs === "none") {
    logger = new Logger({
        mode: "prod",
        type: true,
        timestamp: "none",
        enable: false
    });
} else {
    logger = new Logger({
        mode: config.logs,
        type: true,
        timestamp: "none",
        enable: true
    });
}

if (config.scope === "projects") {
    projects(config, logger);
}

if (config.scope === "reports") {
    reports(config, logger);
}