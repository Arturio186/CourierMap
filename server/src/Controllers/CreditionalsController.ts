import {Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import GenerateJWT from "../Utilities/GenerateJWT";
import User from '../Models/User';

interface IUserRequestData {
    id: number;
    email: string;
    role: number;
}

interface IAuthentication extends Request {
    user: IUserRequestData;
}

class CreditionalsController {
    static async Registartion(req: Request, res: Response, next: NextFunction) : Promise<void> {
        const {email, password} = req.body;
        
        const candidate = await User.GetUserByEmail(email);

        if (candidate) {
            res.json({status: 403, message: 'Пользователь с таким email уже существует!'});
            return;
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.Create(email, hashPassword);
        
        const token = GenerateJWT(user.id, user.email, user.role);
        
        res.json({status: 200, message: { token: token }});
    }

    static async Authorization(req: Request, res: Response, next: NextFunction) : Promise<void> {
        const {email, password} = req.body;

        const user = await User.GetUserByEmail(email);

        if (!user) {
            res.json({status: 404, message: 'Пользователь с таким email не найден!'});
            return;
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            res.json({status: 404, message: 'Неверный пароль!'});
            return;
        }

        const token = GenerateJWT(user.id, user.email, user.role);
        
        res.json({status: 200, message: { token: token }});
    }
    
    static async Authentication(req: IAuthentication, res: Response, next: NextFunction) : Promise<void> {
        const token = GenerateJWT(req.user.id, req.user.email, req.user.role);

        res.json({status: 200, message: { token: token }});
    }
}

export default CreditionalsController;
