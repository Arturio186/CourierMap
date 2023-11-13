import {Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import GenerateJWT from "../Utilities/GenerateJWT";
import User from '../Models/User';

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
        console.log(user);
        const token = GenerateJWT(user.id, user.email, user.role);
        
        res.json({token});
    }

    static async Authorization(req: Request, res: Response, next: NextFunction) : Promise<void> {
        console.log('Authorization');
    }
    
    static async Authentication(req: Request, res: Response, next: NextFunction) : Promise<void> {
        console.log('Authentication');
    }
}

export default CreditionalsController;
