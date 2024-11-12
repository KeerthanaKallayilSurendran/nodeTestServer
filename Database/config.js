const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Connection Successfull");
}).catch(err=>{
    console.log("MongoDb connection Failed");
    console.log(err);
})