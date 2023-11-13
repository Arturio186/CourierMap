import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import IAuthentication from "../Interfaces/IAuthenticationRequest";

const AuthMiddleware = async (req: IAuthentication, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({message: "Не авторизован"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        req.user = decoded;

        next();
    }   
    catch (e) {
        res.status(401).json({message: "Не авторизован"});
    }
}

export default AuthMiddleware;