🛍️ Brivana — Firebase Powered eCommerce App

Brivana is a fully functional eCommerce web application built with React, TypeScript, Redux Toolkit, React Query, and Firebase.
This project replaces the FakeStore API with Firestore as a real backend and implements Firebase Authentication, Product Management, User Profiles, and Order History.

-----

🚀 Live Features

🔐 User Registration, Login, Logout (Firebase Auth)
👤 User profile stored and managed in Firestore
🛒 Cart management with Redux + session storage
📦 Products fully managed in Firestore (no FakeStore API)
🛠️ Admin-style product CRUD interface
🧾 Order creation on checkout stored in Firestore
📜 User order history with full order details
🗂️ Shop by category pulled dynamically from Firestore
⚡ React Query for all Firestore data fetching
🎨 Responsive UI with React Bootstrap

-----

🧱 Tech Stack
Technology	Purpose
React + TypeScript	Frontend framework
Redux Toolkit	Cart state management
React Query	Firestore data fetching & caching
Firebase Authentication	User auth
Firebase Firestore	Backend database for products, users, orders
React Router	Navigation
React Bootstrap	UI styling

-----
🔥 Firebase Integration 

This project replaces the FakeStore API entirely with Firestore collections:

Firestore Collections
Collection	Purpose
users	Stores user profiles
products	Stores all product data
orders	Stores user orders and order history

-----

📁 Project Structure
src/
 ├── components/
 ├── pages/
 ├── firebase/        ← All Firestore & Auth logic
 ├── redux/          ← Cart state
 ├── context/        ← Auth context
 ├── types/          ← TypeScript interfaces

-----

⚙️ Environment Variables

Create a .env file in the root with:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

-----
## Live Demo
Deployed on Vercel: https://ecommcicd2426.vercel.app/

-----

▶️ Running the App
npm install
npm run dev

-----

🧠 Architectural Highlights

Separation of concerns between Firebase logic and UI

React Query handles all Firestore caching and re-fetching

Redux manages only cart state

Context manages authentication globally

TypeScript interfaces for all data models

-----

👩‍💻 Author

Kayla Salmon