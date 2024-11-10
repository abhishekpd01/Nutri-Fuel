const express = require("express");
const router = express.Router();

// POST request for userInfo
router.post("/userInfo", async function(req, res) {
    const information = {
        Name: req.body.name,
        Gender: req.body.gender,
        Age: parseInt(req.body.age),
        Height: req.body.height,
        Weight: req.body.Weight,
    };

    try {
        const gptResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.1,
            messages: [{ role: "user", content: "My weight is " + information.Weight + " kg and height is " + information.Height + " m, calculate my BMI and also suggest a diet plan and exercise routine. return the response as json object with the keys BMI, exerciseRoutine and dietPlan." }]
        });
    
        const result = JSON.parse(gptResponse.data.choices[0].message.content);
    
        res.render("result", {
            bmiResult: result.BMI,
            exerciseData: result.exerciseRoutine,
            dietPlan: result.dietPlan
        });
    } catch (error) {
        console.error("Error occured: ", error);
        res.status(error.response.status).send("An error occurred while processing your request. " + error.response.status + ": " + error.response.statusText);
    }
});

router.post("/result", function(req, res) {
    res.redirect("/");
})

module.exports = router;
