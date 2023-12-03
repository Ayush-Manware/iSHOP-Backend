const express = require("express")
const { data} = require("./data")
const app = express()
const cors = require("cors")

app.use(cors())

app.get("/api/main/mensClothing", (req, res)=>{
    const filter = data.filter((a)=> a.category === "men's clothing")
    res.send(filter)
})

app.get("/", (req, res)=>{
    const filter = data.filter((a)=> a.category === "jewelery")
    res.send(filter)
})

app("/:id",(req, res)=>{
    const reqID = req.params.id
    const filter = data.find((a)=> a.id === reqID)
    res.send(filter)
})

app.listen(2100,()=>{
    console.log("Server Started")
})