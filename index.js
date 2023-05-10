const express = require('express');

const secrets = require('./secrets.js')
const app = express();


app.get("/", (req,res)=>{
    res.send("Live")
})
app.listen(secrets.port , ()=>{
    console.log(`Server live on port ${secrets.port}`);
})