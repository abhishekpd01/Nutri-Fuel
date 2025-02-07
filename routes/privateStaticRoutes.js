const express = require("express");
const openai = require("../config/openaiConfig");
const router = express.Router();
exports.router = router;

router.get("/userInfo", (req, res) => {
    res.render('userInfo');
})

router.get("/result", (req, res) => {
    res.render('result');
})

router.get("/TrackWorkout", function(req, res) {
    res.render("trackWorkout", { submitted: false });
});

router.get("/TrackMeal", function(req, res) {
    res.render("trackMeal");
});

router.get("/water", async function(req, res) {
    const prompt = `Give 3 random facts about drinking water, return response as JSON object having key strictly as facts`;
    try {
        const result = await openai.model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Extract JSON content from the text
        const match = text.match(/\{[^{}]*\}/);

        const cleanedText = match[0];

        try {
            const jsonResponse = JSON.parse(cleanedText);// Use the cleaned text for parsing
            console.log(jsonResponse.facts);       //for debugging

            res.render("trackWater", { Facts: jsonResponse.facts });
        } catch (error) {
            console.error("Error occurred: ", error);
            render("trackWater", { Facts: "Your brain is 75% water. Dehydration can cause brain fog, fatigue, and even headaches." });
        }

    } catch (error) {
        console.error("Error occurred: ", error);
        res.status(error.response.status).render("error");
    }

    res.render("trackWater");
});

router.get("/recipes", function(req, res) {
    res.render("recipes", { submitted: false });
});

module.exports = router;