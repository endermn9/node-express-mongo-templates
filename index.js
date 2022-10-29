const express = require('express');
require('dotenv').config();

const app = express();

const petapi = require('./routes/petroute')

app.use(express.json());

petapi(app);

app.listen(process.env.PORT,() =>{
    console.log(`Escuchando on ${process.env.HOST}:${process.env.PORT}/api`);
})