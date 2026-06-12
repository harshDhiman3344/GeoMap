# GeoJournal
 
A cool idea which was in my mind since a while, I finally built it. 
In GeoJournal you can log your favourite memories of locations or some cool spot recommendations anywhere on the global map!

PS: IT MIGHT TAKE LIKE 20 SECONDS TO LOAD FOR THE FIRST TIME U OPEN IT (because render shuts down the cluster if it is not being used (Im on free :P version))
 
The website is livee at [geo-map-three.vercel.app](https://geo-map-three.vercel.app)
 
---
 
## What it does!
 
- Click anywhere on the map to drop a journal entry at that location
- Everyone can see all entries on the map, but only you can delete yours
- You sign in with Clerk
- You can choose your username on the first startup
- Your username shows up in the pop-up whenever someone clicks on your pin
- There's a profanity filter because I'd like to keep it wholesome and nice
---
 
## Tech Stack 🧑🏻‍💻
 
- React + Vite on the frontend
- Node + Express + MongoDB on the backend
- Clerk for authentication and login
- React Leaflet, an open source library for the world map
- Hosted it on Vercel (frontend) and Render (backend)
---


## How to run it locally
 
You'll need Node, a MongoDB atlas account, with a new client, and a Clerk account.
 
**Backend**
 
```bash
cd backend
npm install
```
 
Make an `.env` file:
 
```
MONGODB_URI=your_mongo_uri
PORT=5000
```
To run backend: 
```bash
npm run dev
```
 
**Frontend**
 
```bash
cd frontend
npm install
```
 
Make a `.env` file:
 
```
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```
To run front-end:
```bash
npm run dev
```
 
---

IMAGES:

<img width="1097" height="711" alt="Screenshot 2026-06-04 125803" src="https://github.com/user-attachments/assets/4223f98a-87d2-4165-a8c5-aa9ccb57e479" />

<img width="953" height="630" alt="Screenshot 2026-06-04 130214" src="https://github.com/user-attachments/assets/81f535f1-105b-4e41-bb54-9c1c25723b15" />

