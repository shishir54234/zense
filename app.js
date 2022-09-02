const express = require('express') //first we import it 
const path=require('path')
const Task=require('./model/user')
const dish=require('./model/dishes')
require("dotenv").config()
const connectDB=require('./db/connect')
const app = express()
const brcypt=require('bcrypt')
const mongoose=require('mongoose')
const session=require('express-session')
const jwt=require('jsonwebtoken')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')
//Session
let MongoStore= MongoDbStore.create({
	mongoUrl: process.env.MONGO_URI,
	collection: 'sessions',
})
// Session config

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(session(
	{
		secret: process.env.COOKIE_SECRET,
		resave:false,
		store: MongoStore,
		saveUninitialized: false,
		cookie: {maxAge: 1000*60*60*24}	}
))

app.use(flash())

const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')







app.use('/', express.static(path.join(__dirname,'public')))

app.use(expressLayout)
app.use((req,res,next)=>{
	res.locals.session=req.session
	next()
})
app.set('view engine', 'ejs');
app.get("/menu", async (req,res)=>{
	const Menu=await dish.find()
    res.render('menu',{Menu:Menu})
})
app.get("/cart",(req,res)=>{
	res.render("customers/cart")
})

app.get("/about", (req, res) => {
    // var name = req.query.name
    // var age = req.query.age
    res.render('side-bar')
    // console.log("Name :", name)
    // console.log("Age :", age)
})


app.post('/api/update-cart',(req,res)=>{
	
	console.log(req.session.cart.items)
	if(req.session.cart.items==={}){
		console.log('abc')
		req.session.cart={
			items:{},
			totalQty:0,
			totalPrice:0,
		}
	}
	let cart=req.session.cart
	if(!cart.items[req.body._id]){
		cart.items[req.body._id]={
			items: req.body,
			qty:1
		}
		cart.totalQty=cart.totalQty+1;
		cart.totalPrice=cart.totalPrice+req.body.price
	}
	else{
		cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
		cart.totalQty=cart.totalQty+1;
		cart.totalPrice=cart.totalPrice+req.body.price
	}
		
		
	return res.end(JSON.stringify({rez: "NIGGA"}))
	// return res.json([{totalQty: req.session.cart.totalQty, totalPrice: req.session.cart.totalPrice}])
})
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

