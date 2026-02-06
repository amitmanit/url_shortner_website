# URL Shortner

Professional URL shortener with a clean, modern frontend and a Node.js + Express backend.

## Features
- Shorten long URLs instantly
- Dark/light theme toggle
- Copy and open short links
- MongoDB storage with visit tracking

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- Vanilla HTML/CSS/JS frontend

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Start MongoDB
Make sure MongoDB is running locally at `mongodb://localhost:27017/urlshortner`.

### 3) Run the server
```bash
node index.js
```

### 4) Open the app
Visit `http://localhost:8001`.

## API

### Create short URL
`POST /url`
```json
{
  "originalUrl": "https://example.com/very-long-link"
}
```

Response:
```json
{
  "shortUrl": "abc12345",
  "id": "mongodb_id"
}
```

### Redirect
`GET /:shortUrl`  
Redirects to the original URL and logs a visit.

## Project Structure
- `public/` frontend assets
- `controllers/` request logic
- `models/` database models
- `Routers/` API routes

## Author
Created by Amit.
