import jwt from 'jsonwebtoken';

const GenerateJWT = (id : number, email : string, role : number) => {
    return jwt.sign(
        { id, email, role }, 
        process.env.SECRET_KEY as string, 
        { expiresIn: "14d" }
    )
}

export default GenerateJWT;