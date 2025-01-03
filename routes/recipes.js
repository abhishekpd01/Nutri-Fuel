const express = require("express");
const openai = require("../config/openaiConfig");
const router = express.Router();

// POST for Recipes
router.post("/cooking-directions", async function(req, res) {
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
        res.status(error.response.status).render("error");
    }
});

module.exports = router;
