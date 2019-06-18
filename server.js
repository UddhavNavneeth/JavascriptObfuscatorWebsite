//Not in use

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

let app = express();
let port = 2000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home.hbs');
})

app.post('/upload', (req, res) => {
    console.log(req.file);
    fs.readFile(req.file.myFile.path, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            res.send(err);
        }
        let obfuscationResult = JavaScriptObfuscator.obfuscate(data);
        let obfuscatedCode = obfuscationResult.getObfuscatedCode();
        let newPath = `${__dirname}/obfuscatedFiles/obfuscated_${req.files.myFile.name}`;
        fs.writeFile(newPath, obfuscatedCode, function(err) {
            if (err) {
                return res.send(err);
            }
            res.send('succesfully obfuscated and saved file');
        })

    })
})

app.listen(port);
console.log(`Server is up on port ${port}`);