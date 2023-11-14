import {Request} from 'express';
import jwt from 'jsonwebtoken';
import IUserRequestData from './IUserRequestData';


export default interface IAuthentication extends Request {
	user?: IUserRequestData;
}