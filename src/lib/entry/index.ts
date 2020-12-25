import { program } from "commander";
import * as finder from "find-package-json";
import { IAppConfig } from "./interfaces";
import { projects } from "./lib/projects";
import { reports } from "./lib/reports";

export * from "./interfaces";
 
const pkg = finder(__dirname).next().value;

const config: IAppConfig = {
    keys: {}
};

program.version(`version: ${pkg.version}`, "-v, --version", "output the current version.");
program.name(pkg.name);
program.addHelpCommand(false);
program.usage("[commands]");



reports(program, config);
projects(program, config);

program.parse(process.argv);

export default config;