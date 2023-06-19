const express = require("express");
const path= require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const puerto=3001;

const app = express();

app.use(cors())

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({extended:true})

app.use(urlencodedParser);
app.use(jsonParser);

mongoose.connect("mongodb+srv://felixomardominguez847:contra847@cluster0.jqlttgs.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    console.log("conected")
}).catch((err)=>{
    console.log("error");
    console.log(err)
});

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

const modelMongoJugador= mongoose.model("Jugador",JugadorSchema);

const modelMongoEntrenador= mongoose.model("Entrenador",EntrenadorSchema);

const modelMongoArbitro= mongoose.model("Arbitro",ArbitroSchema);

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
