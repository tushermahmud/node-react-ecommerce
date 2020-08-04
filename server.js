const express=require("express");
const app=express();
const morgan=require("morgan");
const mongoose=require("mongoose");
const cors=require("cors")
require("dotenv").config();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const expressValidator = require('express-validator');
const path = require('path');

//import router
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product")
const braintreeRoutes=require("./routes/braintree")
const orderRoutes=require("./routes/order")

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


mongoose.connect(process.env.MONGO_URL||"mongodb+srv://tusher:sazzadmahmud16301091@cluster0-jaavp.mongodb.net/ecommerce>?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connected");
})

//routes middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use('/api',braintreeRoutes)
app.use('/api',orderRoutes)

//running node app on the server
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const port=process.env.PORT||8000;
app.listen(port,()=>console.log(`the app is running on port ${port}`));

//connecting mongo db

