const sectionSeleccionarAtaque = document.getElementById
('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanImagenJugador = document.getElementById('imagen-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanImagenEnemigo = document.getElementById('imagen-enemigo')
const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const botonesJugador = document.getElementById('botones-jugador')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
let contaitor = 0

let jugadorId = null
let enemigoId = null
let mokepones = [] //declaración de arreglos
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo =[]
let movimientos
let conteoDeAtaques = 0
let opcionDeMokepones
let opcionDeAtaques
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let conti = 0
let indexAtaqueJugador
let indexAtaqueEnemigo
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let inputLangostelvis 
let inputPydos 
let inputTucapalma
let mascotaJugador
let mascotaJugadorObjeto
let removed
let victoriasJugador = 0
let victoriasEnemigo = 0
let resultadoFinal 
let imagen
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaBuscada
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 800
if( anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa
}
alturaBuscada = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaBuscada

//crear clases
class Mokepon {//clases inician con mayuscula y variables con minuscula
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.movimientos = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
//crear objetos
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png') 

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let langostelvis = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/mokepons_mokepon_langostelvis_attack.png')

let pydos = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/mokepons_mokepon_pydos_attack.png')

let tucapalma = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/mokepons_mokepon_tucapalma_attack.png')

const hipodoge_ataques = [
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🌱', id: 'boton-tierra'},
]

hipodoge.movimientos.push(...hipodoge_ataques) //pasar los ordenes y no comportarse como lista

const capipepo_ataques = [
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'💧', id: 'boton-agua'},
] 

capipepo.movimientos.push(...capipepo_ataques)

const langostelvis_ataques= [
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
]

langostelvis.movimientos.push(...langostelvis_ataques)

const pydos_ataques = [
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
]

pydos.movimientos.push(...pydos_ataques)

const tucapalma_ataques = [
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🌱', id: 'boton-tierra'},
]

tucapalma.movimientos.push(...tucapalma_ataques)

const ratigueya_ataques = [
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
]

ratigueya.movimientos.push(...ratigueya_ataques)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis,pydos,tucapalma) //empujar los valores al arreglo

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none' 
    sectionVerMapa.style.display = 'none' 

    mokepones.forEach((mokepon) =>{
        //comillas invertidas
        opcionDeMokepones = ` 
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}> 
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones //que inyecte todos 

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputPydos = document.getElementById('Pydos')
        inputTucapalma = document.getElementById('Tucapalma')

    })

    sectionReiniciar.style.display = 'none'   
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)  
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAljuego()
}

function unirseAljuego(){
    //petición al navegador
    fetch("http://10.27.120.113:8080/unirse")
        .then(function (res) {
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        jugadorId = respuesta
                    })
            }
        })
}


function seleccionarMascotaJugador(){
      
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        imagen = `<img src=${hipodoge.foto}>`
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        imagen = `<img src=${capipepo.foto}>`
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        imagen = `<img src=${ratigueya.foto}>`
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        imagen = `<img src=${langostelvis.foto}>`
        mascotaJugador = inputLangostelvis.id
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        imagen = `<img src=${pydos.foto}>`
        mascotaJugador = inputPydos.id
    } else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id
        imagen = `<img src=${tucapalma.foto}>`
        mascotaJugador = inputTucapalma.id
    } else {
        alert("Seleccione una mascota")
        return
        //location.reload()
    }

    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'

    seleccionarMokepon(mascotaJugador) //enviar dato al backend
    spanImagenJugador.innerHTML = imagen
    extrarAtaques(mascotaJugador)
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch("http://10.27.120.113:8080/mokepon/" + jugadorId, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        }) //convertir el json en texto

    })
    //fetch(`http://localhost:8080/mokepon/${jugadorId}`)
}

function extrarAtaques(mascotaJugador,){ 
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            movimientos = mokepones[i].movimientos
        }
        
    }
    mostrarAtaques(movimientos)


}

function mostrarAtaques(movimientos){

    movimientos.forEach((ataque) =>{
        opcionDeAtaques = ` 
        <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `
        botonesJugador.innerHTML += opcionDeAtaques 
        conti++
    })
    botones = document.querySelectorAll('.boton-de-ataque')
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == '🔥') {
                ataqueJugador.push('FUEGO')
            } else if (e.target.textContent == '💧') {
                ataqueJugador.push('AGUA')
            } else {
                ataqueJugador.push('TIERRA')
            }
            boton.style.background = '#3E6D9C'
            boton.disabled = true 
            if(ataqueJugador.length == conti){
            enviarAtaques()
            }
        })
    })
    
}

function enviarAtaques() {
    fetch(`http://10.27.120.113:8080/mokepon/${jugadorId}/ataques`, {
        method:"post",
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://10.27.120.113:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if(res.ok) {
                res.json()
                .then(function ({ ataques}) {
                    if (ataques.length == conti){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
   spanMascotaEnemigo.innerHTML = enemigo.nombre
   ataquesMokeponEnemigo = enemigo.movimientos
   imagen = `<img src=${enemigo.foto}>`
   spanImagenEnemigo.innerHTML = imagen
   
    /*let mascotaAleatoria = aleatorio(0,mokepones.length-1)
    imagen = `<img src=${mokepones[mascotaAleatoria].foto}>`
    spanImagenEnemigo.innerHTML = imagen
    spanMascotaEnemigo .innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].movimientos*/
    
    secuenciaAtaque()
}

function ataqueAleatorio(){
    
    let ataqueAleatorioEnemigo = aleatorio(0,ataquesMokeponEnemigo.length-1)
    console.log('ataque enemigo', ataquesMokeponEnemigo)
    if (ataquesMokeponEnemigo[ataqueAleatorioEnemigo].nombre == '🔥' ) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataquesMokeponEnemigo[ataqueAleatorioEnemigo].nombre == '💧' ) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    removed= ataquesMokeponEnemigo.splice(ataqueAleatorioEnemigo, 1);  
    iniciarPelea()
}

/*unction iniciarPelea(){
    
    
    if (ataqueJugador.length == conti) {
        combate()
    }
}*/
    


function crearMensaje(){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')


    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function indexAmbosOponentes(contador){
    indexAtaqueJugador = ataqueJugador[contador]
    indexAtaqueEnemigo = ataqueEnemigo[contador]

}


function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        
        if(ataqueEnemigo[index] == ataqueJugador[index]){
            resultado = 'EMPATE'
        } else if(ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA' || ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO' || ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA'){
            resultado = 'GANASTE'
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            resultado = 'PERDISTE'
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        indexAmbosOponentes(index)
        crearMensaje()
    }
    revisarVictorias()
}

function revisarVictorias(){
    if (victoriasEnemigo == victoriasJugador){
        crearMensajeFinal("Gran combate, ha sido un empate")
    }else if (victoriasEnemigo > victoriasJugador){
        crearMensajeFinal("Lo siento, perdiste :(")
    } else {
        crearMensajeFinal("Felicitaciones! Ganaste :)")
    }

}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
   
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach( function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

    
}

function enviarPosicion(x, y){
    fetch(`http://10.27.120.113:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x, //abreviar en caso x: x
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemigos}) {
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        let mokeponEnemigo = null
                        if (mokeponNombre == "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png',enemigo.id) 
                        } else if (mokeponNombre == "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png',enemigo.id)
                        } else if (mokeponNombre == "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemigo.id)
                        } else if (mokeponNombre == "Langostelvis"){
                            mokeponEnemigo = new Mokepon('Langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5, './assets/mokepons_mokepon_langostelvis_attack.png', enemigo.id)
                        } else if (mokeponNombre == "Pydos"){
                            mokeponEnemigo = new Mokepon('Pydos', './assets/mokepons_mokepon_pydos_attack.png', 5, './assets/mokepons_mokepon_pydos_attack.png', enemigo.id)
                        } else if (mokeponNombre == "Tucapalma"){
                            mokeponEnemigo = new Mokepon('Tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5, './assets/mokepons_mokepon_tucapalma_attack.png', enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y   

                        return mokeponEnemigo

                        

                    })
                })
        }
    })
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -15
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 15
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 15
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -15
}

function detenerMovimiento(){ 
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'w':
            moverArriba()
            break
        case 's':
            moverAbajo()
            break
        case 'a':
            moverIzquierda()
            break
        case 'd':
            moverDerecha()
            break
    
        default:
            break
    }

}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown',sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo){
    if(enemigo.x == undefined || enemigo.y == undefined){
        return
    }
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho 
    const izquierdaEnemigo = enemigo.x 
    
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho 
    const izquierdaMascota = mascotaJugadorObjeto.x 
    
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        
        return
    }

    
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    
   
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    

}

window.addEventListener("load", iniciarJuego)