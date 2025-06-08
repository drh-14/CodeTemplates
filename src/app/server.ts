import express from 'express';

const app = express();
const PORT = 8000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.get('/template/:id', (req, res) => {

});

app.post('/template', (req, res) => {

});

app.put('/template/:id', (req, res) => {

});

app.delete('/template/:id', (req, res) => {

});

