const express = require("express");
const path= require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {MongoClient,FindCursor,ListCollectionsCursor} = require('mongodb')

const puerto=3001;

const app = express();

app.use(cors())

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({extended:true})

app.use(urlencodedParser);
app.use(jsonParser);

var jugadores = [];
var entrenadores = [];
var arbitros = [];
var equipos = [];
var partidos = [];
var juegaens = [];
var entrenaas = [];
var jugadorxpartido = [];
var arbitroxpartido = [];

mongoose.connect("mongodb+srv://felixomardominguez847:contra847@cluster0.jqlttgs.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    console.log("conected")
}).catch((err)=>{
    console.log("error");
    console.log(err)
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const JugadorSchema={
    Nombre: String,
    Nacimiento: Date
}

const EntrenadorSchema={
    Nombre: String,
    Nacimiento: Date
}

const ArbitroSchema={
    Nombre: String,
    Nacimiento: Date
}

const ClubSchema={
    Nombre: String
}

const EquipoSchema={
    Nombre: String,
    IDClub: String
}

const PartidoSchema={
    IDJornada: String,
    Fecha: Date,
    IDLocal: String,
    IDVisitante: String
}

const JuegaEnSchema={
    IDJugador: String,
    IDEquipo: String
}

const EntrenaASchema={
    IDEntrenador: String,
    IDEquipo: String
}

const TemporadaSchema={
    FechaInicio: Date,
    FechaFinal: Date
}

const JornadaSchema={
    IDTemporada: String,
    FechaInicio: Date,
    FechaFinal: Date
}

const JugadorXPartidoSchema={
    IDJugador: String,
    IDPartido: String,
    Alineacion: String
}

const ArbitroXPartidoSchema={
    IDArbitro: String,
    IDPartido: String,
    Rol: String
}

const modelMongoJugador= mongoose.model("Jugador",JugadorSchema);

const modelMongoEntrenador= mongoose.model("Entrenador",EntrenadorSchema);

const modelMongoArbitro= mongoose.model("Arbitro",ArbitroSchema);

const modelMongoClub= mongoose.model("Club",ClubSchema);

const modelMongoEquipo= mongoose.model("Equipo",EquipoSchema);

const modelMongoPartido= mongoose.model("Partido",PartidoSchema);

const modelMongoJuegaEn= mongoose.model("JuegaEn",JuegaEnSchema);

const modelMongoEntrenaA= mongoose.model("EntrenaA",EntrenaASchema);

const modelMongoTemporada= mongoose.model("Temporada",TemporadaSchema);

const modelMongoJornada= mongoose.model("Jornada",JornadaSchema);

const modelMongoJugadorXPartido= mongoose.model("JugadorXPartido",JugadorXPartidoSchema);

const modelMongoArbitroXPartido= mongoose.model("ArbitroXPartido",ArbitroXPartidoSchema);

app.listen(puerto,()=>{
    console.log("Servidor funcionando en el puerto",puerto);
});


app.post("/createJugador",async (req,res) =>{
    const data = new modelMongoJugador({
        Nombre: req.body.Nombre,
        Nacimiento: req.body.Nacimiento,
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createEntrenador",async (req,res) =>{
    const data = new modelMongoEntrenador({
        Nombre: req.body.Nombre,
        Nacimiento: req.body.Nacimiento,
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createArbitro",async (req,res) =>{
    const data = new modelMongoArbitro({
        Nombre: req.body.Nombre,
        Nacimiento: req.body.Nacimiento,
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createClub",async (req,res) =>{
    const data = new modelMongoClub({
        Nombre: req.body.Nombre,
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createEquipo",async (req,res) =>{
    const data = new modelMongoEquipo({
        Nombre: req.body.Nombre,
        IDClub: req.body.IDClub
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createPartido",async (req,res) =>{
    const data = new modelMongoPartido({
        IDJornada: req.body.IDJornada,
        Fecha: req.body.Fecha,
        IDLocal: req.body.IDLocal,
        IDVisitante: req.body.IDVisitante
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createJuegaEn",async (req,res) =>{
    const data = new modelMongoJuegaEn({
        IDJugador: req.body.IDJugador,
        IDEquipo: req.body.IDEquipo
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createEntrenaA",async (req,res) =>{
    const data = new modelMongoEntrenaA({
        IDEntrenador: req.body.IDEntrenador,
        IDEquipo: req.body.IDEquipo
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createTemporada",async (req,res) =>{
    const data = new modelMongoTemporada({
        FechaInicio: req.body.FechaInicio,
        FechaFinal: req.body.FechaFinal
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createJornada",async (req,res) =>{
    const data = new modelMongoJornada({
        IDTemporada: req.body.IDTemporada,
        FechaInicio: req.body.FechaInicio,
        FechaFinal: req.body.FechaFinal
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createJugadorXPartido",async (req,res) =>{
    const data = new modelMongoJugadorXPartido({
        IDJugador: req.body.IDJugador,
        IDPartido: req.body.IDPartido,
        Alineacion: req.body.Alineacion
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createArbitroXPartido",async (req,res) =>{
    const data = new modelMongoArbitroXPartido({
        IDArbitro: req.body.IDArbitro,
        IDPartido: req.body.IDPartido,
        Rol: req.bodyRol
    })
    const value = await data.save()
    res.status(200).send({
        "msg":"creado existosamente",
        "data":value
    })
})

app.post("/createMultipleJugadorXPartido",async (req,res) =>{
    console.log("Connection Successful!");

    var books = [{ IDJugador: '6487f02796fe743eb65d09a8', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f03a96fe743eb65d09aa', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f05596fe743eb65d09ac', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f06c96fe743eb65d09ae', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f0bb96fe743eb65d09b0', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f0cd96fe743eb65d09b2', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f0e296fe743eb65d09b4', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f0ff96fe743eb65d09b6', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f11796fe743eb65d09b8', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f13296fe743eb65d09ba', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f14996fe743eb65d09bc', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Inicial' },
    { IDJugador: '6487f15e96fe743eb65d09be', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Reserva' },
    { IDJugador: '6487f17c96fe743eb65d09c0', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Reserva' },
    { IDJugador: '6487f19196fe743eb65d09c2', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Reserva' },
    { IDJugador: '6487f1aa96fe743eb65d09c4', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Reserva' },
    { IDJugador: '6487f1c296fe743eb65d09c6', IDPartido: '648a988f0569766a09f917c7', Alineacion: 'Reserva' },
    ];  

    modelMongoJugadorXPartido.collection.insertMany(books, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
})

app.post("/createMultipleArbitroXPartido",async (req,res) =>{
    console.log("Connection Successful!");
 
    var books = [{ IDArbitro: '6487f8bed2b3ae7e06a78984', IDPartido: '648a988f0569766a09f917c7', Rol: 'Principal' },
    { IDArbitro: '6487f8d1d2b3ae7e06a78986', IDPartido: '648a988f0569766a09f917c7', Rol: 'Auxiliar' },
    { IDArbitro: '6487f8f5d2b3ae7e06a78988', IDPartido: '648a988f0569766a09f917c7', Rol: 'Auxiliar' },
    { IDArbitro: '6487f905d2b3ae7e06a7898a', IDPartido: '648a988f0569766a09f917c7', Rol: 'Reserva' },
    ];  
   
    modelMongoArbitroXPartido.collection.insertMany(books, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
})

app.get("/Simular",(req,res)=>{
    modelMongoPartido.find().then((data)=>{
        partidos = data;
        // console.log(partidos[0].IDLocal);
        // console.log(partidos[0].IDVisitante);
        // console.log(partidos[0].Fecha);
        // console.log(partidos[0]._id.valueOf());

    }).catch((err) =>{
        console.log(err);
    })

    modelMongoJugador.find().then((data)=>{
        jugadores = data;       
    }).catch((err) =>{
        console.log(err);
    })

    modelMongoEntrenador.find().then((data)=>{
        entrenadores = data;       
    }).catch((err) =>{
        console.log(err);
    })

    modelMongoArbitro.find().then((data)=>{
        arbitros = data;       
    }).catch((err) =>{
        console.log(err);
    })

    modelMongoEquipo.find().then((data)=>{
        equipos = data;       
    }).catch((err) =>{
        console.log(err);
    })

    modelMongoJuegaEn.find().then((data)=>{
        juegaens = data;       
    }).catch((err) =>{
        console.log(err);
    })

    modelMongoEntrenaA.find().then((data)=>{
        entrenaas = data;       
    }).catch((err) =>{
        console.log(err);
    })

    modelMongoJugadorXPartido.find().then((data)=>{
        jugadorxpartido = data;       
    }).catch((err) =>{
        console.log(err);
    })

    modelMongoArbitroXPartido.find().then((data)=>{
        arbitroxpartido = data;       
    }).catch((err) =>{
        console.log(err);
    })

    res.status(200).send({
        "msg":"creado existosamente",
        "data":":D"
    })
})


