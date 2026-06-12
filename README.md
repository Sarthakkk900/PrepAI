![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)
# 🚀 PrepAI - AI Powered Interview Preparation Platform

## 🌐 Live Demo

**Frontend:** https://prep-ai-amber-rho.vercel.app

**Backend:** https://prepai-6hqm.onrender.com

---

## 📖 Overview

PrepAI is a full-stack AI-powered interview preparation platform built using the MERN Stack. It helps users prepare for technical interviews by generating role-specific interview questions, evaluating answers using AI, analyzing resumes, and providing detailed feedback and performance analytics.

The platform simulates real interview experiences and helps candidates identify strengths, weaknesses, and improvement areas.

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### 🤖 AI Interview Generation

* AI-generated interview questions
* Role-based interview creation
* Difficulty selection
* Database fallback when AI is unavailable

### 📄 Resume Analysis

* PDF Resume Upload
* Resume Parsing
* Automatic Role Detection
* Skill Extraction using AI

### 🎯 Interview Experience

* Interactive Interview Interface
* Question-by-Question Answer Submission
* Interview History Tracking

### 📊 AI Evaluation

* AI Answer Evaluation
* Score Generation
* Strength Analysis
* Weakness Analysis
* Personalized Feedback
* Ideal Answer Suggestions

### 📈 Dashboard & Analytics

* User Dashboard
* Interview History
* Analytics Visualization
* Performance Tracking

### ☁️ Deployment

* Frontend hosted on Vercel
* Backend hosted on Render
* MongoDB Atlas Database

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* PDF Parse

### Database

* MongoDB Atlas
* Mongoose

### AI Integration

* OpenRouter API
* AI Question Generation
* AI Resume Analysis
* AI Interview Evaluation

---

## 📂 Project Structure

```text
PrepAI
│
├── backend
│   │
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   │
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── interview.controller.js
│   │   │   ├── interviewResponse.controller.js
│   │   │   ├── result.controller.js
│   │   │   ├── resume.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── middleware
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models
│   │   │   ├── User.js
│   │   │   ├── Interviews.js
│   │   │   ├── Questions.js
│   │   │   ├── Result.js
│   │   │   └── InterviewResponse.js
│   │   │
│   │   ├── routes
│   │   │   ├── auth.routes.js
│   │   │   ├── interview.routes.js
│   │   │   ├── interviewResponse.routes.js
│   │   │   ├── result.routes.js
│   │   │   ├── resume.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── test.routes.js
│   │   │
│   │   ├── services
│   │   │   ├── ai.service.js
│   │   │   ├── evaluateInterview.service.js
│   │   │   └── resumeAnalysis.service.js
│   │   │
│   │   ├── utils
│   │   │   ├── calculateScore.js
│   │   │   └── generateFeedback.js
│   │   │
│   │   └── app.js
│   │
│   ├── data
│   │   └── questions.js
│   │
│   ├── server.js
│   ├── seedQuestions.js
│   └── package.json
│
├── frontend
│   │
│   ├── src
│   │   ├── api
│   │   │   └── axios.js
│   │   │
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

---

## 🔄 Application Workflow

1. User registers and logs in.
2. User creates an interview.
3. User selects a role and difficulty or uploads a resume.
4. AI generates interview questions.
5. User answers interview questions.
6. AI evaluates responses.
7. Detailed feedback and performance scores are generated.
8. Results are stored for future analysis.

---

## 🎯 Key Highlights

* Full-Stack MERN Application
* JWT Authentication
* Resume Parsing & Skill Extraction
* AI-Powered Question Generation
* AI-Based Interview Evaluation
* MongoDB Atlas Integration
* Protected Routes
* Responsive UI
* Production Deployment

---

## 🚀 Future Improvements

* Voice-to-Text Answers
* AI Follow-Up Questions
* Dark Mode
* Resume-Based Custom Interviews
* Company-Specific Interview Sets
* Interview Performance Trends
* Advanced Analytics Dashboard
* Gamification & Leaderboards

---

## 👨‍💻 Author

**Sarthak Jain**

Built as a full-stack MERN project to help students and professionals prepare for technical interviews using AI.

---

⭐ If you found this project useful, consider giving it a star on GitHub!
