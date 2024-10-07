const express = require('express');
const app = express();
const router = express.Router();

let users = require('./users.json');

router.post("/user/signup/:username/:password", (req, res) => { //BROKEN
    const {username, password} = req.params;


    console.log(Object.keys(users).length)

    console.log(users)

    let alreadyExists = false;
    let count = 0;
    if (users.length != 0){
        for (var i = 0; i < users.length; i++){
            count++
            if (users[i]["username"] == username){
                console.log(users[i]["username"])
                alreadyExists = true;
                break
                    
            }
        }
    }

    if(!alreadyExists){
        users = {...users, 
            "username": username,
            "password": password 
        };
        
        console.log(users)

        res.status(201).send("You, " + username + ", have created a new account.")
    }
    else{
        res.status(201).send(username + " already exists on the server!");     
    }


});



app.use('/', router);
app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));