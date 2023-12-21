import { Request, Response, NextFunction } from "express";
import APIError from "../Errors/APIError";

import Logger from "../Utilities/Logger";

const ErrorHandlingMiddleware = async (error : Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof APIError) {
        Logger.error(`API Error: ${error.status} - ${error.message}`);
        return res.status(error.status).json({message: error.message});
    }

    Logger.error(`Internal Error: 500 - ${error.message}`);
    return res.status(500).json({message: "Unexpected error"});
}

export default ErrorHandlingMiddleware;