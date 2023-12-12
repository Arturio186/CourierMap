import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import GenerateJWT from "../Utilities/GenerateJWT";
import User from '../Models/User';

import IAuthentication from "../Interfaces/IAuthentication";
import IUserRequestData from "../Interfaces/IUserRequestData";

class CreditionalsController {
    static async Registartion(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {name, surname, email, password, role} = req.body;
        
            const candidate = await User.GetUserByEmail(email);

            if (candidate) {
                res.json({status: 403, message: 'Пользователь с таким email уже существует!'});
                return;
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.Create(name, surname, email, hashPassword, role);
            
            const token = GenerateJWT(user.id, user.email, user.role);
            
            res.json({status: 200, message: { token: token }});
        }
        catch (error) {
            console.log(error);
        }
    }

    static async Authorization(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {email, password} = req.body;

            const user = await User.GetUserByEmail(email);

            if (!user) {
                res.json({status: 404, message: 'Пользователь с таким email не найден!'});
                return;
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                res.json({status: 400, message: 'Неверный пароль!'});
                return;
            }

            const token = GenerateJWT(user.id, user.email, user.role);
            
            res.json({status: 200, message: { token: token }});
        }
        catch (error) {
            console.log(error);
        } 
    }
    
    static async Authentication(req: IAuthentication, res: Response, next: NextFunction) : Promise<void> {
        try {
            const user = req.user as IUserRequestData;
        
            const token = GenerateJWT(user.id, user.email, user.role);

            res.json({status: 200, message: { token: token }});
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default CreditionalsController;
