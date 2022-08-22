const express = require('express') //first we import it 
const path=require('path')
const Task=require('./model/user')
const connectDB=require('./db/connect')
const app = express()
const brcypt=require('bcrypt')
var bodyParser = require('body-parser')
require("dotenv").config()

// app.use(express.json());
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname,'public')))

app.post('/api/v1/register',async (req,res)=>{
    // console.log(req.body)
    // const{username,password}=req.body
    // password=await brcypt.hash(password, 10)
    // res.json({status:'ok'})
    try{
        const {username, password: plainTextPassword}=req.body
        if(!username || typeof username !== 'string'){
            return res.json({status:'error', error:'Invalid username'})
        }
        if(!plainTextPassword || typeof plainTextPassword
             !== 'string'){
            return res.json({status:'error', error:'Invalid password'})
        }

        const task=await Task.create (req.body)
        res.status(201).json({task})
    }
    catch(error){

    }
})


const start= async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(3000,()=>{
            console.log(`server is listening of port number=3000`)})
    }
    catch(error){
        console.log(error)

    }

}
start()

