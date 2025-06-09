import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = 8000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.post('/login', (req, res) => {

});

app.get('/logout', (req, res) => {

});

app.put('/user', (req, res) => {

});

app.delete('/user', (req, res) => {

});

app.get('/template/:id', (req, res) => {

});

app.post('/template', (req, res) => {

});

app.put('/template/:id', (req, res) => {

});

app.delete('/template/:id', (req, res) => {

});