const express = require('express');
const app = express();
const router = express.Router();

let users = require('./users.json');
let employees = require('./employees.json');

router.post("/user/signup/:username/:password", (req, res) => { //BROKEN
    const {username, password} = req.params;

    //console.log(Object.keys(users).length)

    //console.log(users)

    let alreadyExists = false;
    let count = 0;
    if (users.length != 0){
        for (user in users){
            count++
            console.log("loop " + user)
            if (user["username"] == username){
                console.log(user["username"])
                alreadyExists = true;
                break
                    
            }
            else {
                console.log("nope")
            }
        }
    }

    if(!alreadyExists){
        
        /*
        usr5 = { 
            "username": username,
            "password": password 
        };
        */

        let userId = "usr" + count
        
        users = {...users,             
            usr5:{ 
                "username": username,
                "password": password 
            }
        }
        

        res.status(201).send(username + " has been added.")
    }
    else{
        res.status(201).send(username + " already exists on the server!");     
    }

    console.log(users)
});

router.get("/emp/employees", (req, res) => { //this one works
    res.status(200)
    res.sendFile(__dirname + "/employees.json");
});

// /api/v1/emp/employees/{eid}
router.get("/emp/employees/:id", (req, res) => { //this one works
    res.status(200)
    res.sendFile(__dirname + "/employees.json");
});


app.use('/', router);
app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));