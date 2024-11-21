const express = require("express");
const router = express.Router();

// POST for trackWorkout

router.post("/workout", async function(req, res) {
    const exerciseType = req.body.exerciseType;
    const duration = req.body.duration;
    const intensity = req.body.intensity;

    try {
        const gptResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.1,
            messages: [{ role: "user", content: "exercise type - " + exerciseType + ", intensity - " + intensity + ", duration - " + duration + " min. what is the total calorie burned suggest some tips, and return the response as a JSON object having key values as total_calorie_burned, tips." }]
        });
    
        const result = JSON.parse(gptResponse.data.choices[0].message.content);
        res.render("trackWorkout", { submitted: true, calorieBurned: result.total_calorie_burned, Tips: result.tips });
    } catch (error) {
        console.error("Error occurred: ", error);
        res.status(error.response.status).send("An error occurred while processing your request. " + error.response.status + ": " + error.response.statusText);
    }
});

module.exports = router;




// // app.post("/TrackMeal", async function(req, res){
    
//     const input = [
//         "find the macros of the dish - 1 bowl of chicken curry and generate the response as JSON object",
//         "find the macros of the dish - 1 bowl of matar paneer and generate the response as JSON object",
//         "find the macros of the dish - 1 bowl of fish curry and generate the response as JSON object",
//     ];

//     const messages = [];

//     input.forEach((input) => {
//         messages.push({role: "user", content: input});
//     });

//     const gptResponse = await openai.createChatCompletion({
//         model:"gpt-3.5-turbo",
//         temperature: 0.1,
//         messages: messages,
//     });

//     const result = JSON.parse(gptResponse.data.choices[0].message.content);

//     console.log(result);
// });