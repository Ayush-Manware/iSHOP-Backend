const express = require("express")
require('./database/config')
const User = require("./database/user")

const app = express()

app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Home")
})

app.post("/signup", async (req, res)=>{
    let user = new User(req.body)
    let result = await user.save()
    res.send(result)
})

app.listen(2100, ()=>{
    console.log("Server Started")
})