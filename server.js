const express=require('express');
const connectDB= require('./config/db');
const app=express();

// app use

/*app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());*/

// database connection

connectDB();

//Middleware
app.use(express.json({extended:false}));
var cors = require('cors');
app.use(cors());

app.get('/',(req,res)=> {
    res.status(200).send(`API is running..`);
});



// Routes

app.use('/api/users', require ('./Routes/api/users'));
app.use('/api/profile', require ('./Routes/api/profile'));
app.use('/api/post', require ('./Routes/api/post'));
app.use('/api/auth', require ('./Routes/api/auth'));




// listening port
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is on port ${PORT}`);
});