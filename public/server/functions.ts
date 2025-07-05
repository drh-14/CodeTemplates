import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function hashPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export function createJWT(userID:string){
    const payload = {userID: userID};
    const token = jwt.sign(payload, process.env.JWT_KEY!, {expiresIn: '1h'});
    return token;
};