// express le nom de module js = import express module 
const express = require("express");
// bscrypt le nom de module 
const bcrypt = require("bcrypt");
// import body-parser 
const bodyParser = require("body-parser");
// import mongoose module 
const mongoose = require("mongoose");
// import axios module
const axios = require("axios");
// import jsonwebtoken module 
const jwt = require("jsonwebtoken");
// sportFekriDB c la data base name de ce projet , creation automatique de la data base 
mongoose.connect('mongodb://127.0.0.1:27017/sportFekriDB');
// create an express application
const app = express();
//import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import match model 
const Match = require("./models/match");
const Player = require("./models/player");
const User = require("./models/user")
const Team = require("./models/team");
const team = require("./models/team");
// ./middelware/authenticate
const authenticate = require("./middelware/authenticate");
// configure Body parser 
// send JSON reponses
app.use(bodyParser.json())
// get object from request
app.use(bodyParser.urlencoded({ extended: true }));
// .use pour la configuration de l'application 
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

// 
// ce tableau il faut qu'il soit en dehors de all function il est globale 
let matchTab = [
    { id: 1, scoreOne: 1, scoreTwo: 3, teamOne: "est", teamTwo: "CA" },
    { id: 1, scoreOne: 2, scoreTwo: 0, teamOne: "EVV", teamTwo: "VYL" }
];

//   app.MethodeHTTP("/path",(req,res) => { traitements}); c toujours comme ça 
// business Logic: Add Match
app.post("/matches", (req, res) => {
    console.log("here BL :Add Match", req.body);
    // create match var (TYPE Match) =>
    // var will be saved into matches

    let match = new Match({
        teamOne: req.body.teamOne,
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
        teamTwo: req.body.teamTwo
    });
    console.log("here match", match);
    // methode prédefinie de mongoose 
    match.save();
    res.json({ message: "Added with success", isAdded: true });
});

// business Logic: get all Match
app.get("/matches", authenticate, (req, res) => {
    console.log("here BL :Get all Match");
    Match.find().then((data) => {
        res.json({ matches: data, message: "ok" });
    });
})


// business Logic: search match il faut ajouter qlq chose apres le / si nn rien ne va marcher 
app.get("/matches", (req, res) => {
    let nvtab = [];
    let match = req.body;
    console.log("here BL :search match ");
    for (let i = 0; i < matchTab.length; i++) {
        if (matchTab[i].scoreOne == match.scoreOne && matchTab[i].scoreTwo == match.scoreTwo) {
            nvtab.push(matchTab[i]);
            res.json({ match: nvtab });
        }

    }
});


// business Logic: edit  Match
app.put("/matches", (req, res) => {
    console.log("here BL :edit  Match");
    let newMatch = req.body;
    console.log("newMatch", newMatch);
    Match.updateOne({ _id: newMatch._id }, newMatch).then((editResponse) => {
        console.log("editResponse", editResponse);
        if (editResponse.nModified == 1) {
            res.json({ message: "Match edited with success" })
        }
    })

});

// business Logic: get match by ID
app.get("/matches/:id", (req, res) => {
    console.log("here BL :get match By ID");
    // on peut changer le id par X 
    let id = req.params.id;

    // for (let i = 0; i < matchTab.length; i++) {
    //     if (matchTab[i].id == id) {
    //         console.log("here finded match", matchTab[i]);
    //         res.json({ match: matchTab[i] });
    //         break;
    //     }

    // }
    Match.findOne({ _id: id }).then((data) => {
        res.json({ match: data })
    })
});

// business Logic: delete match by ID
app.delete("/matches/:id", (req, res) => {
    console.log("here BL :delete match By ID");
    let id = req.params.id;
    for (let i = 0; i < matchTab.length; i++) {
        if (matchTab[i].id == id) {
            matchTab.splice(i, 1);
            break;
        }

    }
    res.json({ message: `Match N ${id} is deleted` });
});

// business Logic: login users
// 0 => Check Email 
// 1 => Check PWD 
// 2 => Welcome 
app.post("/allUsers/signin", (req, res) => {
    console.log("here BL :Login users");
    let findedUser;
    User.findOne({ email: req.body.Email }).then((doc) => {
        console.log("here the searched object by email", doc);
        findedUser = doc;
        if (!doc) {
            res.json({ message: "0" });
            // RES.JSON une chose bloquante elle bloque tous ce qui est trouvé au dessous 
        }
        return bcrypt.compare(req.body.password, doc.password);

    }).then((pwdResult) => {
        console.log("here pwdResult", pwdResult);
        if (!pwdResult) {
            res.json({ message: "1" });
        } else {
            const token = jwt.sign(
                {
                    email: findedUser.email,
                    userId: findedUser._id,
                    userRole: findedUser.role,
                },
                // la chaine de hashage c tres importnt , on peut la modifier c kelmt sir 
                "Testing",
                // c le temps que la session expire 
                { expiresIn: "1min" }
            );
            let userToSend = {
                id: findedUser._id,
                firstName: findedUser.firstName,
                lastName: findedUser.lastName,
                role: findedUser.role,
                jwt: token,
                expiresIn: 60,
            }
            res.json({ message: "2", user: userToSend });
        }
    })
});

// business Logic: signUp users
app.post("/allUsers/subscription", (req, res) => {
    console.log("here the oject", req.body);
    bcrypt.hash(req.body.password, 8).then((bcryptPWD) => {
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptPWD,
            role: req.body.role,
        })
        user.save((error, doc) => {
            console.log("here error", error);
            console.log("here doc", doc);
            if (doc) {
                res.json({ message: "the object is added" })
            } else {
                res.json({ message: "error" })
            }
        });


    })

});

// business Logic: editProfile users
app.put("/allUsers", (req, res) => {
    console.log("here BL :editProfile users");
    let newProfile = req.body;
    console.log("newProfile", newProfile);
    User.findOne({ id: newProfile._id }).then((user) => {
        console.log("here the searched object by email", user);

        bcrypt.compare(req.body.password, user.password);
    }).then((pwdResult) => {
        console.log("pwdResult", pwdResult);
        if (!pwdResult) {
            json.res({ message: "Incorrect password" })
        }

    })

    bcrypt.hash(req.body.newPassword, 8, (err, hashedPassword) => {

        if (err) {
            console.log(err);
            return res.json({ message: "Error hashing password" });
        }


        User.updateOne({ _id: newProfile._id }, { password: hashedPassword }).then((editResponse) => {
            console.log("editResponse", editResponse);
            res.json({ data: editResponse });
        });
    });
});

playerTab = [
    { id: 1, Name: "ikram", age: 34, position: 13, nbr: 10 },
    { id: 2, Name: "youssef", age: 20, position: 7, nbr: 5 }
]

// business Logic: add players
app.post("/players", (req, res) => {
    console.log("here BL :add players");
    let player = new Player({
        Name: req.body.Name,
        age: req.body.age,
        position: req.body.position,
        nbr: req.body.nbr,

    });
    player.save();
    res.json({ message: "all object are added" });

});

// business Logic: edit players
app.put("/players", (req, res) => {
    console.log("here BL :edit players");
});

// business Logic: delete players
app.delete("/players/:id", (req, res) => {
    console.log("here BL :delete players");
});
// business Logic: get player by id 
app.get("/players/:id", (req, res) => {
    console.log("here BL :get player by id ");
    let id = req.params.id;
    Player.findOne({ _id: id }).then((data) => {
        console.log("data", data);
        res.json({ player: data, message: "ok" });
    })
});

// business Logic: get all players
app.get("/players", (req, res) => {
    console.log("here BL :get all players ");
    Player.find().then((data) => {
        res.json({ players: data, message: "ok" });
    })

});

// business Logic : get user by id 
app.get("/allUsers/:id", (req, res) => {
    let id = req.params.id;
    User.findOne({ _id: id }).then((data) => {
        res.json({ user: data })
    });
})
// business Logic : add Teams
app.post("/teams", (req, res) => {
    console.log("here the objct of teams", req.body);
    let teamObj = new Team({
        teamName: req.body.Name,
        teamStadium: req.body.stadium,
        teamOwner: req.body.owner,
        teamFoundation: req.body.foundation,
    })
    teamObj.save((err, doc) => {
        (err) ? res.json({ message: "NOK" }) : res.json({ message: "OK" })
    });

})
// business Logic of gel all teams
app.get("/teams", (req, res) => {
    console.log("here all teams");
    Team.find().then((data) => {
        res.json({ teams: data })
    })
}
)

// business Logic of delete team
app.delete("/teams/:id", (req, res) => {
    let teamId = req.params.id;
    console.log("here into delete by ID", teamId);
    Team.deleteOne({ _id: teamId }).then((deleteResponse) => {
        console.log("deletResponse", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: "deleted with success" });
        }

    })

})

// Business Logic of Get Team by ID
app.get("/teams/:id", (req, res) => {
    Team.findOne({ _id: req.params.id }).then((response) => {
        res.json({ team: response });
    })
})

// Business Logic of search weather 
app.post("/weather", (req, res) => {
    console.log("here the object", req.body);
    let city = req.body.city;
    let key = "fe60a5872410e1e47dd1b3c2967c35a5";
    // let apiUrl=`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    axios.get(apiUrl).then((apiResponse) => {
        console.log("here apiResponse", apiResponse.data);
        let result = {
            temperature: apiResponse.data.main.temp,
            pressure: apiResponse.data.main.pressure,
            humidity: apiResponse.data.main.humidity,
            sunrise: apiResponse.data.sys.sunrise,
            sunset: apiResponse.data.sys.sunset,
            icone: `https://openweathermap.org/img/wn/${apiResponse.data.weather[0].icon}.png`
        }
        res.json({ apiResult: result });

    });
})

// il faut que module.exports= app; soit la derniere par ce qu'il va exporter tous
module.exports = app;

