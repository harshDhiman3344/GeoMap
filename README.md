# GeoJournal 🌍📝
 
I built this because I wanted a simple way to remember places, not just photos, but actual thoughts tied to a location. You open a map, click somewhere, write what you were feeling, and it saves. That's pretty much it.
 
It's live at [geo-map-three.vercel.app](https://geo-map-three.vercel.app)
 
---
 
## What it does!
 
- Click anywhere on the map to drop a journal entry at that location
- Everyone can see all entries on the map (it's intentionally public)
- You sign in with Clerk, and only you can delete your own entries
- Your username shows up on your pins so people know who wrote what
- There's a profanity filter because I'd like to keep it wholesome
---
 
## Stack 🧑🏻‍💻
 
- React + Vite on the frontend
- Node + Express + MongoDB on the backend
- Clerk for auth
- React Leaflet for the map
- Hosted on Vercel (frontend) and Render (backend)
---

The design is intentionally cozy, soft purples, cream cards, pixel shadows, Space Mono font. There's a little animated cat in the sidebar. I like it.



## Running it locally 🖥️
 
You'll need Node, a MongoDB Atlas connection string, and a Clerk account.
 
**Backend**
 
```bash
cd backend
npm install
```
 
Make a `.env` file:
 
```
MONGODB_URI=your_mongo_uri
PORT=5000
```
 
```bash
npx nodemon server.js
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
 
```bash
npm run dev
```
 
---
 
## API ⚡
 
| Method | Route | Who can use it |
|--------|-------|----------------|
| GET | `/api/journals` | Everyone |
| POST | `/api/journals` | Signed in users |
| DELETE | `/api/journals/:id` | The entry's creator only |
| PUT | `/api/journals/:id` | The entry's creator only |