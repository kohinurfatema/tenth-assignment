# 🌍 EcoTrack - A Sustainable Challenge Platform

## 🔗 Live Application Link
**[Replace with your actual deployed live link here]**

## 💡 Overview

EcoTrack is a full-stack, responsive web application designed to encourage sustainable living through engaging environmental challenges. Users can register, log in, browse a curated list of eco-challenges, and track their progress, making sustainability social and measurable.

This project was built to demonstrate proficiency in modern full-stack development tools and practices, focusing on modularity, security, and a responsive user experience.

## ✨ Key Features (Focusing on Your Completed Small Part)

### 💻 Client-Side (Frontend)
* **User Authentication Flow:** Complete registration and login system secured by Firebase.
* **Challenge Browsing:** Fetches and displays a list of challenges from the server API.
* **Responsive Design:** Optimized layout for all devices, including mobile and tablet screens.

### ⚙️ Server-Side (Backend)
* **Challenge API:** Implemented the core route (`/api/challenges`) to fetch data from MongoDB.
* **Secure Connection:** Established a stable connection to the MongoDB Atlas cluster.
* **Firebase Integration:** Utilized the Firebase Admin SDK for user management and authentication handling.

## 🛠️ Technologies Used

### Frontend
* **React:** For building the user interface.
* **Vite:** As the build tool for fast development and bundling.
* **React Router DOM:** For handling client-side routing (e.g., `/challenges`, `/login`).
* **Tailwind CSS (or your chosen CSS framework):** For utility-first styling and achieving a fully **responsive** layout.
* **Firebase (Client SDK):** For client-side user authentication (Registration/Login).
* **Axios:** For making HTTP requests to the backend API.

### Backend
* **Node.js & Express.js:** The core runtime and framework for the RESTful API server.
* **MongoDB & Mongoose/MongoDB Driver:** The NoSQL database for storing challenge and user data.
* **Firebase Admin SDK:** For secure server-side management of user tokens and sessions.
* **JSON Web Tokens (JWT):** For securing private routes and user authorization.

## 🚀 Getting Started (Local Setup)

To run this project locally, you will need Node.js installed.

### 1. Clone the Repositories

```bash
# Clone the client (frontend)
git clone <your-frontend-repo-url> eco-track-client
cd eco-track-client

# Clone the server (backend)
git clone <your-server-repo-url> eco-track-server
cd eco-track-server