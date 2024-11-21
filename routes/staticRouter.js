const express = require("express");
const path = require("path");
const router = express.Router();

// GET requests
router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/About", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/about.html"));
});

router.get("/Contact", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/contact.html"));
});

router.get("/Session", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/session.html"));
});

router.get("/workout", function(req, res) {
    res.render("trackWorkout", { submitted: false });
});

router.get("/meal", function(req, res) {
    res.render("trackMeal");
});

router.get("/water", function(req, res) {
    res.render("trackWater");
});

router.get("/recipes", function(req, res) {
    res.render("recipes", { submitted: false });
});

// POST Requests

// router.post("/", function(req, res) {
//     res.sendFile(path.join(__dirname + "/../views/userInfo.html"))
// })

// router.post("/userInfo", async function(req, res) {
//     const information = {
//         Name: req.body.name,
//         Gender: req.body.gender,
//         Age: parseInt(req.body.age),
//         Height: req.body.height,
//         Weight: req.body.Weight,
//     };

//     try {
//         const gptResponse = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             temperature: 0.1,
//             messages: [{ role: "user", content: "My weight is " + information.Weight + " kg and height is " + information.Height + " m, calculate my BMI and also suggest a diet plan and exercise routine. return the response as json object with the keys BMI, exerciseRoutine and dietPlan." }]
//         });
    
//         const result = JSON.parse(gptResponse.data.choices[0].message.content);
    
//         res.render("result", {
//             bmiResult: result.BMI,
//             exerciseData: result.exerciseRoutine,
//             dietPlan: result.dietPlan
//         });
//     } catch (error) {
//         console.error("Error occured: ", error);
//         res.status(error.response.status).send("An error occurred while processing your request. " + error.response.status + ": " + error.response.statusText);
//     }
// });

// router.post("/result", function(req, res) {
//     res.redirect("/");
// })

module.exports = router;