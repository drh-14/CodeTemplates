import express from 'express';
import * as functions from './functions';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 8000;

const supabaseClient = createClient("https://jkosvxuxzuxvzoqtwoup.supabase.co", process.env.SUPABASE_PUBLIC_KEY!);

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

app.post('credentials', (req, res) => {
    // probably will just have to figure something out with some API
})

app.put('/user', async (req, res) => {
    const { username, email, password } = req.body;
    const { data, error } = await supabaseClient.from('users').select().match({ email: email });
    if (error) {

    }
    else {
        if (data) {
            res.status(500).json("Email already in use");
        }
        else {
            const { data, error } = await supabaseClient.from('users').select().match({ username: username });
            if (error) {

            }
            else {
                if (data) {
                    res.status(500).json("Username already in use");
                }
                else {
                    const hashedPassword = functions.hashPassword(password);
                    const { error } = await supabaseClient.from('users').insert({ username: username, email: email, password: hashedPassword });
                    if (error) {
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
    try{
        const verifiedToken = jwt.verify(req.cookies.token, process.env.JWT_KEY!) as {username: string, email: string};
        const {error} = await supabaseClient.from("users").delete().eq('email', verifiedToken.email);
        if(error){
            res.status(500).json(error);
        }
        else{
            res.status(200).json("User successfully deleted");
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

app.get('/template/:id', (req, res) => {

});

app.post('/template', (req, res) => {

});

app.put('/template/:id', (req, res) => {

});

app.delete('/template/:id', (req, res) => {

});