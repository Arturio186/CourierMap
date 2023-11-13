import {Request} from 'express';
import jwt from 'jsonwebtoken';

export default interface IAuthentication extends Request {
	user?: string | jwt.JwtPayload;
}