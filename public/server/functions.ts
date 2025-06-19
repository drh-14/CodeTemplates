import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassword(password:string){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function createJWT(username:string, email: string){
    const payload = {username: username, email: email};
    const token = jwt.sign(payload, "", {expiresIn: '1h'});
    return token;
};

export function verifyJWT(token:string){
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_KEY!);
        return decodedToken;
    }
    catch(error){
        console.error(error);
        return error;
    }

}