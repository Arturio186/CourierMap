import { makeAutoObservable } from 'mobx';
import IUser from '../interfaces/IUser';

class UserStore {
    _isAuth : boolean;
    _user : IUser | undefined;

	constructor() {
		makeAutoObservable(this);
        this._isAuth = false;
        this._user = undefined;
	}

    setIsAuth(value : boolean) {
        this._isAuth = value;
    }

    setUser(user : IUser) {
        this._user = user;
    }

	get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

}

export default UserStore;