export interface IAppConfig {
    scope?: string
    action?: string
    logs?: string
    keys: {
        url?: string
        project_name?: string
        report_name?: string
        ingress_name?: string
        namespace?: string
        options_path?: string
        workload_name?: string
        report_path?: string
        folder_path?: string
        output?: string
    }
}