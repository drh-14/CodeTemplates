var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import * as functions from './functions.js';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import * as bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
const supabaseClient = createClient("https://jkosvxuxzuxvzoqtwoup.supabase.co", process.env.SUPABASE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const { data, error } = yield supabaseClient.from("users").select().eq('username', username);
        if (error) {
            res.status(401).json(error.message);
        }
        if (!data || data.length === 0) {
            res.status(401).json("Invalid username.");
        }
        else {
            const userPassword = data[0].password;
            const comparisonResult = yield bcrypt.compare(password, userPassword);
            if (!comparisonResult) {
                res.status(401).json("Invalid password.");
            }
            else {
                const token = functions.createJWT(data[0].userID);
                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 1000
                });
                res.status(200).json("Logged in successfully.");
            }
        }
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
app.get('/logout', (_req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: 'strict'
        });
        res.status(200).json("User logged out");
    }
    catch (error) {
        console.error(error);
    }
});
app.put('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const { data, error } = yield supabaseClient.from('users').select().match({ email: email });
    if (error) {
        console.log(error);
    }
    else {
        if (data && data.length > 0) {
            res.status(500).json("Email already in use");
        }
        else {
            const { data, error } = yield supabaseClient.from('users').select().match({ username: username });
            if (error) {
                console.log(error);
            }
            else {
                if (data && data.length > 0) {
                    console.log("username in use");
                    res.status(500).json("Username already in use");
                }
                else {
                    const userID = uuidv4();
                    const hashedPassword = yield functions.hashPassword(password);
                    const { error } = yield supabaseClient.from('users').insert({ username: username, email: email, password: hashedPassword, userID: userID });
                    if (error) {
                        console.log(error);
                        res.status(500).json(error);
                    }
                    else {
                        const token = functions.createJWT(userID);
                        res.cookie("token", token, {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 60 * 60 * 1000
                        });
                        res.status(200).json("Account creation successful.");
                    }
                }
            }
        }
    }
}));
app.delete('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const userID = payload.userID;
        const { error } = yield supabaseClient.from("users").delete().eq('userID', userID);
        if (error) {
            res.status(500).json(error);
        }
        else {
            const { error } = yield supabaseClient.from("templates").delete().eq('userID', userID);
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.status(200).json("User successfully deleted");
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
app.post('/resetCredentials', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { data, error } = yield supabaseClient.from('users').select().eq("email", email);
    if (error) {
        res.status(500).json(error.message);
    }
    else {
        if (data.length === 0) {
            res.status(500).json("Email not found.");
        }
        else {
            try {
                yield resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: [email],
                    subject: 'CodeTemplates: Reset Credentials',
                    html: `<h3>
                <p>Reset your credentials at <a href = "http://localhost:3000/resetCredentials?email=${email}">this link.</a></p>
                </h3>`,
                });
                res.status(200).json("Reset email sent successfully.");
            }
            catch (error) {
                console.log(error);
                res.status(401).json(error);
            }
        }
    }
}));
app.post('/credentials', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const hashedPassword = yield functions.hashPassword(password);
    try {
        const { error } = yield supabaseClient.from('users').update({ username: username, password: hashedPassword }).eq('email', email);
        if (error) {
            console.log(error);
            res.status(401).json(error.message);
        }
        else {
            res.status(200).json("Changed credentials successfully.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
app.get("/templates", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const userID = payload.userID;
        const { data, error } = yield supabaseClient.from('templates').select().match({ userID: userID });
        if (error) {
            res.status(500).json(error.message);
        }
        else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.get('/template/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        yield jwt.verify(token, process.env.JWT_KEY);
        const id = req.params.id;
        const { data, error } = yield supabaseClient.from('templates').select('name, language, code').eq('id', id);
        if (error) {
            console.log(error.message);
            res.status(401).json(error.message);
        }
        else {
            res.status(200).json(data[0]);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
// Create new code template
app.put('/template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const userID = payload.userID;
        const { code, language, name } = req.body;
        const id = uuidv4();
        const { error } = yield supabaseClient.from('templates').insert({ id: id, name: name, userID: userID, code: code, language: language });
        if (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
        else {
            res.status(200).json("Template stored successfully.");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
app.post('/template/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const token = req.cookies.token;
        yield jwt.verify(token, process.env.JWT_KEY);
        const { code, name, language } = req.body;
        const id = req.params.id;
        const { error } = yield supabaseClient.from('templates').update({ code: code, name: name, language: language }).eq('id', id);
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json("Template modified successfully.");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.delete('/template/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        yield jwt.verify(token, process.env.JWT_KEY);
        const id = req.params.id;
        const { error } = yield supabaseClient.from('templates').delete().eq('id', id);
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json("Template deleted successfully.");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.post('/email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const payload = yield jwt.verify(token, process.env.JWT_KEY);
        const userID = payload.userID;
        const { email } = req.body;
        const { error } = yield supabaseClient.from('users').update({ email: email }).eq('userID', userID);
        if (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
        else {
            res.status(200).json("Email changed successfully.");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.post('/username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const payload = yield jwt.verify(token, process.env.JWT_KEY);
        const userID = payload.userID;
        const { username } = req.body;
        const { error } = yield supabaseClient.from('users').update({ username: username }).eq('userID', userID);
        if (error) {
            res.status(500).json(error.message);
        }
        else {
            res.status(200).json("Username changed successfully.");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.post('/password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const payload = yield jwt.verify(token, process.env.JWT_KEY);
        const userID = payload.userID;
        const { password } = req.body;
        const hashedPassword = yield functions.hashPassword(password);
        const { error } = yield supabaseClient.from('users').update({ userID: userID, password: hashedPassword }).eq('userID', userID);
        if (error) {
            res.status(500).json(error.message);
        }
        else {
            res.status(200).json("Changed password successfully.");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.get('/jwtClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        yield jwt.verify(token, process.env.JWT_KEY);
        res.status(200).json("Valid token.");
    }
    catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
}));
app.get('/jwtServer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        yield jwt.verify(authHeader, process.env.JWT_KEY);
        res.status(200).json("Valid token.");
    }
    catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
}));
