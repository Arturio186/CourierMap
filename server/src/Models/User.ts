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

    static async Create(name: string, surname: string, email : string, password : string, role: number) : Promise<IUserData> {
        const [user] : IUserData[] = await db('users')
            .returning('*')
            .insert({ 
                surname: surname, 
                name: name,
                email: email,
                password: password,
                role: role
            });

        return user;
    }
}

export default User;