const express = require('express')
const socket = require('socket.io')
const http = require("http")
const { disconnect } = require('process')
const { connect } = require('http2')



// ALL INITIALIZATIONS

const app = express()
const server=http.createServer(app)
const io=socket(server)
app.set("view engine","ejs");

io.on("connection",(User)=>{
    console.log("connected")
    io.emit("connected_Users",{UserID:User.id})

    User.on("send_to_personal",(obj)=>{
        let id = obj.id
        let msg=obj.message
        console.log(`id is ${id} : ${msg}`)
        io.to(id).emit("personal_message",{from:User.id,msg:msg})
    })
})


app.get("/",(req,res)=>{
    res.render("index")
    
})

server.listen(3800,()=>console.log("sevrer working "))

