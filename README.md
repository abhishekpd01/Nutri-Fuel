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
├── node_modules/          # Node.js modules
├── public/                # Static files (CSS, images, JavaScript)
├── views/                 # EJS templates for frontend views
├── .env                   # Environment variables
├── .gitignore             # Files and directories to ignore in Git
├── about                  # About page route
├── app.js                 # Main application file
├── contact                # Contact page route
├── index                  # Homepage route
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Lockfile for dependencies
├── practice               # Practice page route
├── session                # Session handling route
├── userInfo               # User information handling route
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
