const express = require("express") //permite utilizar librerias instaladas por npm
const cors = require("cors")

const app = express() //se usa como función

app.use(express.static('public')) //leer archivos estáticos y conectarlos al server
app.use(cors()) //sin erroes con cors
app.use(express.json()) //capacidad de recibir peticiones post con JSON

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id) //agregar cada jugador a la lista y devolver su id

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*") //*cualquier origen es valido

    res.send(id) //responderle algo al usuario
})

app.post("/mokepon/:jugadorId", (req, res) => { //endpoint
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id)
    
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id)
    
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques", (req, res) => { //endpoint
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id)
    
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id == jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => { //escuche constantemente peticiones de clientes
    console.log("hay server papus")
})











/*comandos minimos para iniciar un servidor
const express = require("express") //permite utilizar librerias instaladas por npm

const app = express() //se usa como función

app.listen(8080, () => { //escuche constantemente peticiones de clientes
    console.log("hay server papus")
})

*/