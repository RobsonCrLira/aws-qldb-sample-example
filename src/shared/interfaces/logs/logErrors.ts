export interface LogErrorsDTO {
    error: string;
    log_id: any;
}

export interface LogErrors {
    log(data: LogErrorsDTO): Promise<void>;
}
