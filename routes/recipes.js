const express = require("express");
const router = express.Router();

// GET and POST for Recipes
router.get("/", function(req, res) {
    res.render("recipes", { submitted: false });
});

router.post("/", async function(req, res) {
    const recipeName = req.body.recipeName;

    try {
        const gptResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.1,
            messages: [{ role: "user", content: recipeName + " recipe return the response as json object having keys recipeName, description, ingredients, instructions and tips." }]
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
        console.error("Error occurred: ", error);
        res.status(error.response.status).send("An error occurred while processing your request. " + error.response.status + ": " + error.response.statusText);
    }
});

module.exports = router;
