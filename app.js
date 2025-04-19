if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
var methodOverride = require('method-override');
const ExpressError = require('./utils/expressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const Localstrategy = require('passport-local');
const User = require('./models/user.js');

const listingRoute = require("./routes/listing.js")
const reviewRoute = require("./routes/review.js")
const userRoute = require("./routes/user.js")

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine("ejs",ejsMate);
const path = require("path");
app.use(express.static(path.join(__dirname,"/public")));

const db_url = process.env.ATLASDB_URL;

main().then((res)=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect(db_url);
}

const store = MongoStore.create({
    mongoUrl:db_url,
    crypto:{
        secret:process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE : ",err)
})

const sessionOptions = {
    store,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 3 * 24 * 60 * 60 + 1000,
        maxAge: 3 * 24 * 60 * 60 + 1000,
        httpOnly : true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.currentPath =  req.path;
    next();
})

app.use("/listings",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute);

//Error handling for unvalid API's
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
})

//Error Handling Middleware
app.use((err,req,res,next)=>{
    let {statusCode = 500,message = "Something went Wrong"} = err;
    res.status(statusCode).render("error.ejs",{err});
})

app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"/views"));

app.listen(8080,()=>{
    console.log("Listening on Port 8080");
})