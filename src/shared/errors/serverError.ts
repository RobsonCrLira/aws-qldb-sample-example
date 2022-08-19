export class ServerError extends Error {
    constructor(error: string) {
        super(`Server Error - ${error}`);
        this.name = 'Server Error';
        this.stack = JSON.stringify(error);
    }
}
