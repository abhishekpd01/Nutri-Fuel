// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const ejs = require("ejs");
const config = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}));

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


// GET requests
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/About", function(req, res){
    res.sendFile(__dirname + "/about.html")
});

app.get("/Contact", function(req, res){
    res.sendFile(__dirname + "/contact.html")
});

app.get("/Session", function(req, res){
    res.sendFile(__dirname + "/session.html")
});

app.get("/TrackWorkout", function(req, res){
    res.render(__dirname +"/views/trackWorkout.ejs", {submitted: false})
});

app.get("/TrackMeal", function(req, res){
    res.render(__dirname +"/views/trackMeal.ejs")
});

app.get("/TrackWater", function(req, res){
    res.render(__dirname +"/views/trackWater.ejs")
});

app.get("/Recipes", function(req, res){
    res.render(__dirname +"/views/recipes.ejs", {submitted: false})
});


// POST requests
app.post("/", function(req, res){
    res.sendFile(__dirname + "/userInfo.html");
});

app.post("/userInfo", async function(req, res){

    const information = {
        Name : req.body.name,
        Gender : req.body.gender,
        Age : parseInt (req.body.age),
        Height : req.body.height,
        Weight : req.body.Weight,
    };

    try {
        const gptResponse = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            temperature: 0.1,
            messages: [{role:"user", content:"My weight is " + information.Weight + " kg and height is " + information.Height + " m, calculate my BMI and also suggest a diet plan and exercise routine. return the response as json object with the keys BMI, exerciseRoutine and dietPlan."}]
        });
    
        // output received as json object
        const result = JSON.parse(gptResponse.data.choices[0].message.content);
    
        res.render("result", {
            bmiResult: result.BMI,
            exerciseData: result.exerciseRoutine,
            dietPlan: result.dietPlan
        });
    } catch (error) {
        console.error("Error occured: ", error);
        res.status(error.response.status).send("An error occured while processing your request. " + error.response.status + ": " + error.response.statusText);
    }
});

app.post("/result", function(req, res){
    res.redirect("/");
});

app.post("/TrackWorkout", async function(req, res){
    // console.log(req.body.exerciseType);
    // console.log(req.body.duration);
    // console.log(req.body.intensity);

    const exerciseType = req.body.exerciseType;
    const duration = req.body.duration;
    const intensity = req.body.intensity;

    try {
        const gptResponse = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            temperature: 0.1,
            messages: [{role:"user", content: "exercise type - "+ exerciseType + ", intensity - " + intensity + ", duration - "+ duration +" min. what is the total calorie burned suggest some tips, and return the response as a JSON object having key values as total_calorie_burned, tips."}]
        });
    
        const result = JSON.parse(gptResponse.data.choices[0].message.content);
        console.log(result);
    
        res.render("trackWorkout", {
            submitted: true,
            calorieBurned: result.total_calorie_burned,
            Tips: result.tips,
        });
    } catch (error) {
        console.error("Error occured: ", error);
        res.status(error.response.status).send("An error occured while processing your request. " + error.response.status + ": " + error.response.statusText);
    }
});

app.post("/Recipes", async function(req, res){
    const recipeName = req.body.recipeName;

    try {
        const gptResponse = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            temperature: 0.1,
            messages: [{role:"user", content: recipeName + " recipe return the response as json object having keys recipeName, description, ingredients, instructions and tips."}]
        });
    
        const result = JSON.parse(gptResponse.data.choices[0].message.content);
    
        res.render("recipes", {
            submitted: true,
            Name: result.recipeName,
            Description: result.description,
            Ingredients: result.ingredients,
            Instructions: result.instructions,
            Tips: result.tips
        });
    } catch (error) {
        console.error("Error occured: ", error);
        res.status(error.response.status).send("An error occured while processing your request. " + error.response.status + ": " + error.response.statusText);
    }
});

app.post("/TrackMeal", async function(req, res){
    
    const input = [
        "find the macros of the dish - 1 bowl of chicken curry and generate the response as JSON object",
        "find the macros of the dish - 1 bowl of matar paneer and generate the response as JSON object",
        "find the macros of the dish - 1 bowl of fish curry and generate the response as JSON object",
    ];

    const messages = [];

    input.forEach((input) => {
        messages.push({role: "user", content: input});
    });

    const gptResponse = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        temperature: 0.1,
        messages: messages,
    });

    const result = JSON.parse(gptResponse.data.choices[0].message.content);

    console.log(result);
});

// app.post("/", function(req, res){
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;

//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName,
//                 }
//             }
//         ]
//     };

//     const jsonData = JSON.stringify(data);

//     const url = "https://us21.api.mailchimp.com/3.0/lists/e15f89873c";
//     const options = {
//         method: "POST",
//         auth: "abhishek01:edb9fc9ce58b26c712d76a9598e6b2b6-us21",
//     }

//     const request = https.request(url, options, function(resposne){
//         resposne.on("data", function(data){
//             console.log(JSON.parse(data));
//         });
//     });

//     request.write(jsonData);
//     request.end();

// });

app.listen(3000, function(){
    console.log("The server is up and running on the port 3000");
});




// mailchimp API key = edb9fc9ce58b26c712d76a9598e6b2b6-us21

//mailchimp List ID = e15f89873c
// I love u baby
// I love u baby 2