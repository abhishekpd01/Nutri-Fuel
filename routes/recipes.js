const express = require("express");
const openai = require("../config/openaiConfig");
const router = express.Router();

// POST for Recipes
router.post("/cooking-directions", async function(req, res) {
    const recipeName = req.body.recipeName;
    
    const prompt = `tell me chocolate cake recipe, return the response as json object having keys strictly as 'recipeName', 'description', 'ingredients', 'instructions' and 'tips' and nothing else. 
    For Example:
    {
    "recipeName": "Matar Paneer",
    "description": "A classic North Indian curry made with green peas and paneer (Indian cottage cheese) cooked in a spiced tomato-onion gravy.",
    "ingredients": [
    "200g paneer, cubed",
    "1 cup green peas (fresh or frozen)",
    "2 medium onions, finely chopped",
    "2 large tomatoes, pureed",
    "1 tbsp ginger-garlic paste",
    "2 tbsp cooking oil or ghee",
    "1 tsp cumin seeds",
    "1/2 tsp turmeric powder",
    "1 tsp coriander powder",
    "1/2 tsp red chili powder",
    "1 tsp garam masala",
    "1/2 cup water",
    "Salt to taste",
    "Fresh cilantro, chopped (for garnish)"
    ],
    "instructions": [
    "Heat oil or ghee in a pan. Add cumin seeds and let them splutter.",
    "Add chopped onions and sauté until golden brown. Stir in ginger-garlic paste and cook for 1-2 minutes.",
    "Add tomato puree and cook until the mixture thickens and oil separates from the sides.",
    "Mix in turmeric powder, coriander powder, red chili powder, and salt. Cook for 2 minutes.",
    "Add green peas and water. Cover and simmer for 5-7 minutes until peas are tender.",
    "Gently stir in paneer cubes and garam masala. Cook for 3-4 minutes on low heat.",
    "Garnish with cilantro and serve hot with naan or rice."
    ],
    "tips": [
    "Use fresh, soft paneer for the best texture. If using store-bought paneer, soak it in warm water for 10 minutes to soften.",
    "Adjust chili powder or add green chilies for extra heat.",
    "Add a splash of cream or cashew paste for a richer gravy.",
    "For a vegan version, substitute paneer with tofu."
    ]
    } 
    `;
    
    try {
        const result = await openai.model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
    
        // Extract JSON content from the text
        const match = text.match(/\{[^{}]*\}/);

        const cleanedText = match[0];
    
        const jsonResponse = JSON.parse(cleanedText); // Use the cleaned text for parsing
        console.log(jsonResponse);
    
        res.render("recipes", {
            submitted: true,
            Name: jsonResponse.recipeName,
            Description: jsonResponse.description,
            Ingredients: jsonResponse.ingredients,
            Instructions: jsonResponse.instructions,
            Tips: jsonResponse.tips
        });
    } catch (error) {
        console.error("Error occurred: ", error);
        res.status(error.response.status).render("error");
    }
});

module.exports = router;
