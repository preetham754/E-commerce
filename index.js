// first import install libery 

import express from "express";
import bodyParse from "body-parser";
import mongoose from "mongoose";



//create app

const app = express()

app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended: true
}))

// conect database



try {
    await mongoose.connect('mongodb://localhost:27017/p-mart', {});
    console.log('Database connected successfully');
} catch(error) {
    console.log("error while connecting to database",error);
}

var db = mongoose.connection;

// check connect

db.on('error', () => console.log("error in connecting database"));
db.once('open', () => console.log("Connected to Database"));


app.get("/", (req, res) => {

    res.set({
        "Allow-access-Allow-Origin": '*'
    })

    return res.redirect('login.html');

}).listen(3019);


    console.log(`Server running at http://localhost:3019`);
 



app.post("/login", async (request, response) => {
    try {
        //adding
        const username = request.body.username;
        const password = request.body.password;

        const usermail = db.collection('p').findOne({ username: username }, (err, res) => {
            if (res == null) {
                response.send("Invalid information!❌❌❌! Please create account first");
            }
            else if (err) throw err;


            if (res.password === password) {
                return response.redirect('home.html');
            }
            else {
                return response.redirect('invalidlogin.html');
            }
            

        });
    }
    catch (error) {
        response.send("Invalid information❌");
    }

    
    
    

})