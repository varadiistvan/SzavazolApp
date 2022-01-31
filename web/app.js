const { json } = require("body-parser")
const express = require("express")
const app = express()
const http = require("http")
const port = process.env.PORT || process.argv[2] || 3000
const server = http.createServer(app)



for(let str of ["valaszto", "orszagos", "compass", "kviz", "info"]){
    app.get("/" + str, (req, res) => {
        res.sendFile(__dirname + "/public/" + str + ".html")
    })
}

app.get("/data/valaszto", (req, res) => {
    let milos = {
        nev:"Ricardo Milos",
        part:"Megduglak KFT",
        kep:"milos0.jpg",
        program:"https://youtu.be/IxWo7yG-W-E"
    }
    let pepe = {
        nev:"Pepe the frog",
        part:"Memeland",
        kep:"pepe0.webp",
        program:"https://youtu.be/LqXOTSB7FPc"
    }
    let jeloltek = [milos, pepe]
    let elso = {
        keruletNev:"Első kerület",
        jeloltek: jeloltek
    }
    let keruletek = {
        0:elso,
        1:{keruletNev:"Második kerület", jeloltek: []}
    }
    res.send(JSON.stringify(keruletek))
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html")
})

app.use(express.static(__dirname + "/public"))


server.listen(port)
console.log(`Server running on port ${port}`)