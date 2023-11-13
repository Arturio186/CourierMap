import {Request, Response, NextFunction } from "express";
import GenerateJWT from "../Utilities/GenerateJWT";

class CreditionalsController {
    async Registartion(req: Request, res: Response, next: NextFunction) : Promise<void> {
        console.log('Register');
    }

    async Authorization(req: Request, res: Response, next: NextFunction) : Promise<void> {
        console.log('Authorization');
    }
    
    async Authentication(req: Request, res: Response, next: NextFunction) : Promise<void> {
        console.log('Authentication');
    }
}

export default new CreditionalsController();
