import jwt from 'jsonwebtoken';

const GenerateJWT  = (id : string, email : string, role : string) => {
    return jwt.sign(
        { id, email, role }, 
        process.env.SECRET_KEY as string, 
        { expiresIn: "14d" }
    )
}

export default GenerateJWT;
