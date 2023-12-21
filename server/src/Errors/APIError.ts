class APIError extends Error {
    status : number;
    message : string;

    constructor(status : number, message: string ) {
        super()

        this.status = status
        this.message = message
    }

    static BadRequest(message : string) {
        return new APIError(400, message);
    }

    static Forbidden(message : string) {
        return new APIError(403, message);
    }

    static NotFound(message : string) {
        return new APIError(404, message);
    }
}

export default APIError; 