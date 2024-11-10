# Nutri Fuel

Nutri Fuel is an AI-based web application that assists users in tracking their workouts, managing calorie intake, and monitoring water consumption. It also provides personalized recipe suggestions based on dietary preferences and allows users to book online workout sessions. The application uses the ChatGPT API 3.5 Turbo for text completion and suggestions.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [License](#license)

## Project Structure
```
Nutri-Fuel/
├── node_modules/           # Node.js modules
├── public/                 # Static files (CSS, images, JavaScript)
│   ├── CSS/
│   ├── JS/
│   └── Assets/
├── views/                  # EJS or HTML templates for frontend views
│   ├── index.html           # Main HTML/EJS file for the homepage
│   ├── about.html           # HTML/EJS for the 'About' page
│   ├── contact.html         # HTML/EJS for the 'Contact' page
│   ├── recipes.ejs        # HTML/EJS for the 'recipe' page
│   ├── session.html         # HTML/EJS for sessions
│   ├── trackMeal.ejs         # HTML/EJS for tracking meal
│   ├── trackWorkout.ejs        # HTML/EJS for tracking workout
│   ├── trackWater.ejs        # HTML/EJS for tracking water intake
│   └── userInfo.html        # HTML/EJS for user info
├── routes/                 # Routes for handling endpoints
│   ├── index.js
│   ├── recipe.js
│   ├── track.js
│   └── user.js
├── models/                 # Database schemas (for MongoDB)
│   ├── User.js
│   ├── Session.js
│   └── Recipe.js
├── config/                 # Configuration files
│   └── config.js           # MongoDB connection and other settings
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── app.js                  # Main application file
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Lockfile for dependencies
└── LICENSE                 # License file
```

## Features
- **Workout Tracking**: Track workouts and log exercise sessions.
- **Calorie and Water Tracking**: Monitor daily calorie intake and water consumption.
- **Recipe Suggestions**: Get AI-generated personalized recipes based on dietary preferences.
- **Workout Sessions**: Book and manage online workout sessions.
- **User Authentication**: Secure login and user sessions.
- **AI-Powered Suggestions**: Uses ChatGPT API 3.5 Turbo for text completions and suggestions.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/nutri-fuel.git
   cd nutri-fuel
2. **Install dependencies:**
   ```bash
   npm install
4. **Set up environment variables: Create a .env file in the root directory and add your variables:**
   ```bash
   PORT=your_port
   OPENAI_API_KEY=your_openai_api_key
5. **Start the server:**
   ```bash
   npm start
6. **Visit:** Open your browser and go to http://localhost:<PORT> to access the application.

# Usage
Once the server is running, you can explore the following features:

- Track and log workouts and water intake.
- Get recipe suggestions based on dietary preferences.
- Book and manage workout sessions.

# Environment Variables
The .env file contains environment-specific variables, including:

- PORT: The port where the server will run.
- OPENAI_API_KEY: Your API key for the OpenAI GPT-3.5 Turbo API.

# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
