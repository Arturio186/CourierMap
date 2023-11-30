import db from '../Database/knex';
import IUserData from '../Interfaces/IUserData';

enum Roles {
    Opeartor = 0,
    Courier 
}

class User {
    static async GetUserByEmail(email : string) {
        const user = await db('users').where({email}).first();
        return user;
    }

    static async Create(email : string, password : string) : Promise<IUserData> {
        const [user] : IUserData[] = await db('users')
            .returning('*')
            .insert({ 
                surname: 'ДОБАВЬ ПОЛЯ', 
                name: 'ДОБАВЬ ПОЛЯ',
                email: email,
                password: password,
                role: Roles.Opeartor
            });

        return user;
    }
}

export default User;