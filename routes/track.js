const express = require("express");
const openai = require("../config/openaiConfig");
const router = express.Router();

// POST for trackWorkout

router.post("/TrackWorkout", async function(req, res) {
    const exerciseType = req.body.exerciseType;
    const duration = req.body.duration;
    const intensity = req.body.intensity;

    const prompt = `exercise type - ${exerciseType}, intensity - ${intensity}, duration - ${duration} min. what is the total calorie burned suggest some tips, and return the response as a JSON object having key values as total_calorie_burned, tips. 
    For Example:
    {
    "total_calorie_burned": 175,
    "tips": [
        "Maintain consistent movement throughout the 30 minutes. Avoid long breaks between rallies.",
        "Focus on a variety of shots including smashes, drops, and clears to engage different muscle groups.",
        "Increase the intensity by playing faster-paced games or practicing drills with shorter rest periods.",
        "Warm up before starting your session and cool down afterwards to prevent injuries.",
        "Stay hydrated by drinking water before, during, and after your badminton session.",
        "Consider varying your workout by incorporating other exercises like lunges, squats, or jumps to improve overall fitness and calorie burn."
    ]
    }

    NOTE: The 'total_calorie_burned' should not be a range. It must be a value.
    ` 

    try {
        const result = await openai.model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Extract JSON content from the text
        const match = text.match(/\{[^{}]*\}/);

        const cleanedText = match[0];

        try {
            const jsonResponse = JSON.parse(cleanedText);// Use the cleaned text for parsing
            console.log(jsonResponse.total_calorie_burned);       //for debugging

            res.render("trackWorkout", { submitted: true, calorieBurned: jsonResponse.total_calorie_burned, Tips: jsonResponse.tips });
        } catch (error) {
            console.error("Error occurred: ", error);
            res.status(error.response.status).render("error");
        }

    } catch (error) {
        console.error("Error occurred: ", error);
        res.status(error.response.status).render("error");
    }
});

router.post("/TrackMeal", async function(req, res){

    const { dishName, servings } = req.body;

    const prompt = `Provide *estimated* macros for ${dishName}, serving ${servings}, return the response in JSON format with keys strictly as calories, protein, fat, carb, fiber, notes.
For example:

{
    "calories": "450-600",
    "protein": "30-40g",
    "fat": "25-40g",
    "carb": "15-25g",
    "fiber": "5-15g",
    "notes": "These values are estimates and can vary significantly depending on the specific recipe, ingredients used (e.g., type of chicken, amount of oil, added vegetables, spices, coconut milk/cream), and serving size.  It's best to use a nutrition calculator or app, inputting the exact ingredients and quantities from your recipe for more accurate macro calculations.  The ranges provided reflect the wide variability possible in chicken curry recipes."
}`

    try {
        const result = await openai.model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Extract JSON content from the text
        const match = text.match(/\{[^{}]*\}/);

        const cleanedText = match[0];

        try {
            const jsonResponse = JSON.parse(cleanedText);// Use the cleaned text for parsing
            console.log(jsonResponse.carb);       //for debugging

            res.render("trackMeal", { 
                submitted: true, 
                cal: jsonResponse.calories, 
                protein: jsonResponse.protein, 
                fat: jsonResponse.fat, 
                carb: jsonResponse.carb,
                fiber: jsonResponse.fiber, 
                notes: jsonResponse.notes 
            });
        } catch (error) {
            console.error("Error occurred: ", error);
            res.status(error.response.status).render("error");
        }

    } catch (error) {
        console.error("Error occurred: ", error);
        res.status(error.response.status).render("error");
    }
});

module.exports = router;



