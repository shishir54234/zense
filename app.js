const express = require('express') //first we import it 
const path=require('path')
const Task=require('./model/user')

const connectDB=require('./db/connect')
const app = express()
const brcypt=require('bcrypt')
const mongoose=require('mongoose')

const jwt=require('jsonwebtoken')

const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
var bodyParser = require('body-parser')


require("dotenv").config()

// app.use(express.json());
// app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname,'public')))



app.get("/about", (req, res) => {
    // var name = req.query.name
    // var age = req.query.age
    res.render('side-bar')
    // console.log("Name :", name)
    // console.log("Age :", age)
})
app.use(expressLayout)
app.set('view engine', 'ejs');


app.post('/api/register', async (req,res)=>{
    const { username, password: plainTextPassword} = req.body

	// if (!username || typeof username !== 'string') {
	// 	return res.json({ status: 'error', error: 'Invalid username' })
	// }

	// if (!plainTextPassword || typeof plainTextPassword !== 'string') {
	// 	return res.json({ status: 'error', error: 'Invalid password' })
	// }

	// if (plainTextPassword.length < 5) {
	// 	return res.json({
	// 		status: 'error',
	// 		error: 'Password too small. Should be atleast 6 characters'
	// 	})
	// }

	let password1 = await brcypt.hash(plainTextPassword, 10)
    
	try {
		const response = await Task.create({username: username, password: password1})
		console.log('User created successfully: ', response)
        let lol={status:'ok'}
        return res.json(response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

})
app.post('/api/v1/login',async (req,res)=>{
    // console.log(req.body)
    // const{username,password}=req.body
    // password=await brcypt.hash(password, 10)
    // res.json({status:'ok'})
    // try{
    //     const {username, password: plainTextPassword}=req.body
    //     if(!username || typeof username !== 'string'){
    //         return res.json({status:'error', error:'Invalid username'})
    //     }
    //     if(!plainTextPassword || typeof plainTextPassword
    //          !== 'string'){
    //         return res.json({status:'error', error:'Invalid password'})
    //     }

    //     const task=await Task.create (req.body)
    //     res.status(201).json({task})
    // }
    // catch(error){

    // }
    const { username, password } = req.body
	const user = await Task.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})








const start= async ()=>{
    try{
        // await connectDB(process.env.MONGO_URI);
        mongoose.connect(process.env.MONGO_URI)
        // console.log(process.env.MONGO_URI)
        app.listen(3000,()=>{
            console.log(`server is listening of port number=3000`)})
    }
    catch(error){
        console.log(error)

    }

}
start()

