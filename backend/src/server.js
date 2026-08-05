import express from "express"
import 'dotenv/config'

// Import Routes
import { connectDB, disconnectDB } from "./config/db.js"

const app = express();

// Middleware
app.use(express.json());

connectDB();


// API Routes
app.get('/', (req, res) => {
  res.send("Hello, World!");
})

app.get('/api/v1/browse', async (req, res) => {

})

// musics


// albums 





const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
