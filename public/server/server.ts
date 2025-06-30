import express from 'express';
import * as functions from './functions.ts';
import { createClient } from '@supabase/supabase-js';
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000' 
}));

const supabaseClient = createClient("https://jkosvxuxzuxvzoqtwoup.supabase.co", process.env.SUPABASE_KEY!);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
 
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = functions.hashPassword(password);
        const { data, error } = await supabaseClient.from("users").select().eq('username', username).eq('hashedPassword', hashedPassword);
        if (error) {
            res.status(500).json("Invalid username or password");
        }
        else {
            const token = functions.createJWT(username, data[0].email);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            });
            res.status(200).json("Login successful");
        }
    }
    catch (error) {
        console.error(error);
    }
});

app.get('/logout', (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(200).json("User logged out");
    }
    catch (error) {
        console.error(error);
    }
});

app.put('/user', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(email);
    console.log(username);
    console.log(password);
    const { data, error } = await supabaseClient.from('users').select().match({ email: email });
    if (error) {
        console.log(error);
    }
    else {
        if (data.length > 0) {
            console.log("error");
            res.status(500).json("Email already in use");
        }
        else {
            const { data, error } = await supabaseClient.from('users').select().match({ username: username });
            if (error) {
                console.log(error);
            }
            else {
                if (data.length > 0) {
                    console.log("username in use");
                    res.status(500).json("Username already in use");
                }
                else {
                    const hashedPassword = await functions.hashPassword(password);
                    const { error } = await supabaseClient.from('users').insert({ username: username, email: email, hashedPassword: hashedPassword });
                    if (error) {
                        console.log(error);
                        res.status(500).json(error);
                    }
                    else {
                        res.status(200).json("Account creation successful.");
                    }
                }
            }
        }
    }
});

app.delete('/user', async (req, res) => {
    try {
        const verifiedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY!) as { username: string, email: string };
        const { error } = await supabaseClient.from("users").delete().eq('email', verifiedToken.email);
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json("User successfully deleted");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Create new code template
app.put('/template', async (req, res) => {
    try{
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;
        const {code, language} = req.body;
        const id = uuidv4();
        const {error} = await supabaseClient.from('templates').insert({id: id, username: payload.username, code: code, language: language});
        if(error){
            res.status(500).json(error.message);
        }
        else{
            res.status(200).json("Template stored successfully.");
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

// Modify code template
app.post('template/:id', async (req, res) => {
    try{
        const token = req.cookies.token;
        await jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;
        const {code, name, language} = req.body;
        const id = req.params.id;
        const {error} = await supabaseClient.from('templates').update({code: code, name: name, language: language}).eq('id', id);
        if(error){
            res.status(500).json(error);
        }
        else{
            res.status(200).json("Template modified successfully.");
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

app.delete('template/:id', async (req, res) => {
    try{
        const token = req.cookies.token;
        await jwt.verify(token, process.env.JWT_KEY!);
        const id = req.params.id;
        const {error} = await supabaseClient.from('templates').delete().eq('id', id);
        if(error){
            res.status(500).json(error);
        }
        else{
            res.status(200).json("Template deleted successfully.");
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});