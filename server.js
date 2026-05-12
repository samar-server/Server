const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const API_KEY = "mysecretkey"

// Middleware
function authenticate(req, res, next){

    const key = req.headers["x-api-key"]

    if(key !== API_KEY){
        return res.status(401).json({
            success: false,
            error: "Invalid API Key"
        })
    }

    next()
}

// Home
app.get("/", (req, res) => {
    res.json({
        status: "API Online"
    })
})

// Health API
app.get("/api/v1/health", authenticate, (req, res) => {

    res.json({
        status: "ok",
        version: "1.0",
        timestamp: new Date()
    })
})

// Active attacks
app.get("/api/v1/active", authenticate, (req, res) => {

    res.json({
        success: true,
        activeAttacks: [],
        count: 0,
        maxConcurrent: 5,
        remainingSlots: 5
    })
})

// Stats
app.get("/api/v1/stats", authenticate, (req, res) => {

    res.json({
        success: true,
        status: "active",
        daysRemaining: 30
    })
})

// Attack endpoint
app.post("/api/v1/attack", authenticate, (req, res) => {

    const { ip, port, duration } = req.body

    res.json({
        success: true,
        attack: {
            id: "attack123",
            target: ip,
            port: port,
            duration: duration,
            endsAt: new Date(Date.now() + duration * 1000)
        },
        limits: {
            currentActive: 1,
            maxConcurrent: 5,
            remainingSlots: 4
        },
        account: {
            status: "active",
            daysRemaining: 30
        }
    })
})
app.get("/api/v1/active", authenticate, (req, res) => {

    res.json({
        success: true,
        activeAttacks: [],
        count: 0,
        maxConcurrent: 5,
        remainingSlots: 5
    })
})
const PORT = process.env.PORT || 3000

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server Started")
})
