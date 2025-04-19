const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then((res)=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const init = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"67e2c730cb41c37eba36dc22",}))
    await Listing.insertMany(initData.data); 
    console.log("Data Intialized")
}
init();