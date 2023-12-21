import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';

import APIError from "../Errors/APIError";

import User from '../Models/User';

import CheckObjectProperties from "../Utilities/CheckObjectProperties";
import GenerateJWT from "../Utilities/GenerateJWT";

import IAuthentication from "../Interfaces/IAuthentication";
import IUserRequestData from "../Interfaces/IUserRequestData";

class CreditionalsController {
    static async Registartion(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            if (!CheckObjectProperties(req.body, ['name', 'surname', 'email', 'password', 'role']))
                return next(APIError.BadRequest('Not all data in the body'));

            const {name, surname, email, password, role} = req.body;
        
            const candidate = await User.GetUserByEmail(email);

            if (candidate) {
                return next(APIError.Forbidden('A user with this email already exists'));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.Create(name, surname, email, hashPassword, role);
            
            const token = GenerateJWT(user.id, user.email, user.role);
            
            res.json({status: 200, message: { token: token }});
        }
        catch (error) {
            next(error);
        }
    }

    static async Authorization(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            if (!CheckObjectProperties(req.body, ['email', 'password'])) {
                return next(APIError.BadRequest('Not all data in the body'))
            }
                
            const {email, password} = req.body;

            const user = await User.GetUserByEmail(email);

            if (!user) {
                return next(APIError.NotFound('The user with this email was not found'));
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                return next(APIError.NotFound('Wrong password'));
            }

            const token = GenerateJWT(user.id, user.email, user.role);
            
            res.json({status: 200, message: { token: token }});
        }
        catch (error) {
            next(error);
        } 
    }
    
    static async Authentication(req: IAuthentication, res: Response, next: NextFunction) : Promise<void> {
        try {
            if (!req.user) {
                return next(APIError.BadRequest('There is no user data'))
            }

            if (!CheckObjectProperties(req.user, ['id', 'email', 'role'])) {
                return next(APIError.BadRequest('Not all data in the req.user'))
            }

            const user : IUserRequestData = req.user
        
            const token = GenerateJWT(user.id, user.email, user.role);

            res.json({status: 200, message: { token: token }});
        }
        catch (error) {
            next(error);
        }
    }
}

export default CreditionalsController;
