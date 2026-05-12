const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        status: "API Online"
    })
})

app.post("/login", (req, res) => {

    const { username, password } = req.body

    if(username === "admin" && password === "1234"){

        return res.json({
            success: true,
            token: "welcome123"
        })
    }

    res.json({
        success: false
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server Started")
})
