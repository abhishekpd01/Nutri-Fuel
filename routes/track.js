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

// router.post("/TrackMeal", async function(req, res){
    
//     const input = [
//         "find the macros of the dish - 1 bowl of chicken curry and generate the response as JSON object",
//         "find the macros of the dish - 1 bowl of matar paneer and generate the response as JSON object",
//         "find the macros of the dish - 1 bowl of fish curry and generate the response as JSON object",
//     ];

//     const messages = [];

//     input.forEach((input) => {
//         messages.push({role: "user", content: input});
//     });

//     try {
//         const gptResponse = await openai.createChatCompletion({
//             model:"gpt-3.5-turbo",
//             temperature: 0.1,
//             messages: messages,
//         });
    
//         const result = JSON.parse(gptResponse.data.choices[0].message.content);
    
//         console.log(result);
//     } catch (error) {
//         console.error("Error occurred: ", error);
//         res.status(error.response.status).render("error");
//     }
// });

module.exports = router;



