const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

let app = express();
let port = process.env.PORT||3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home.hbs');
})

app.post('/upload',upload.single('myFile') ,(req, res,next) => {
   
    //console.log(req.file)
    //console.log(__dirname)
    console.log(req.file.originalname)
    fs.readFile('uploads\\'+req.file.filename,'utf-8',function(err,data){
        if(err){
            return res.status(500).send(err)
        }
        const obfusctaionResult=JavaScriptObfuscator.obfuscate(data)
        const uglyCode=obfusctaionResult.getObfuscatedCode()
        fs.writeFile(req.file.originalname,uglyCode,function(err){
            if(err){
                return res.send(err)
            }
            res.download(path.join(__dirname,req.file.originalname))
        })

    })
    
   
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);

});
