import { Request } from 'express';
import IUserRequestData from './IUserRequestData';

export default interface IAuthentication extends Request {
	user?: IUserRequestData;
}