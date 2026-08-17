import express from "express"
import 'dotenv/config'
import cors from "cors"

// Import Routes
import { connectDB, disconnectDB } from "./config/db.js"
import trackRoute from "./routes/track.route.js"

const app = express();
connectDB();


// Middleware
app.use(express.json());
app.use(cors())


// API Routes
app.get('/', (req, res) => {
  res.send("Hello, World!");
})

app.use("/api/tracks", trackRoute);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
