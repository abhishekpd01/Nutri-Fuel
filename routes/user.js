const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const openai = require("../config/openaiConfig");

const router = express.Router();

router.post('/', handleUserSignup);

router.post('/login', handleUserLogin);

// POST request for userInfo
router.post("/userInfo", async function(req, res) {
    const information = {
        // Name: req.body.name,
        // Gender: req.body.gender,
        // Age: parseInt(req.body.age),
        Height: req.body.height,
        Weight: req.body.Weight,
    };

    const prompt = `My weight is  ${information.Weight} kg and height is ${information.Height}  m, calculate my BMI and also suggest a diet plan and exercise routine. return the response as json object with the keys strictly as BMI, exerciseRoutine and dietPlan.

    For Example
    {
  "BMI": 22.66,
  "exerciseRoutine": [
    {
      "activity": "Cardio (e.g., brisk walking, jogging, cycling)",
      "duration": "30 minutes",
      "frequency": "5 days a week"
    },
    {
      "activity": "Strength training (e.g., squats, push-ups, lunges, planks)",
      "duration": "20-30 minutes",
      "frequency": "2-3 days a week (rest days in between)"
    },
    {
      "activity": "Flexibility and mobility exercises (e.g., yoga, stretching)",
      "duration": "15-20 minutes",
      "frequency": "Daily or as often as possible"
    }
  ],
  "dietPlan": [
    {
      "meal": "Breakfast",
      "examples": [
        "Oatmeal with fruit and nuts",
        "Greek yogurt with berries and granola",
        "Whole-wheat toast with avocado and egg"
      ]
    },
    {
      "meal": "Lunch",
      "examples": [
        "Salad with grilled chicken or fish",
        "Lentil soup with whole-grain bread",
        "Quinoa bowl with vegetables and lean protein"
      ]
    },
    {
      "meal": "Dinner",
      "examples": [
        "Baked salmon with roasted vegetables",
        "Chicken stir-fry with brown rice",
        "Vegetarian chili with whole-wheat tortilla"
      ]
    },
    {
      "meal": "Snacks",
      "examples": [
        "Fruits (apple, banana, berries)",
        "Vegetables (carrots, celery, cucumber)",
        "Nuts and seeds",
        "Greek yogurt"
      ]
    }
  ]
}
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
            console.log(jsonResponse);       //for debugging
        
            res.render("result", {
                bmiResult: jsonResponse.BMI,
                exerciseData: jsonResponse.exerciseRoutine,
                dietPlan: jsonResponse.dietPlan
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).render("error")
        }
    
    } catch (error) {
        console.error("Error occured: ", error);
        res.status(error.response.status).render("error");
    }
});

router.post("/result", function(req, res) {
    res.redirect("/");
})

module.exports = router;
