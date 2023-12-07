
// Framework para suporte à aplicações Web
import express from "express";
// Importando o modelo para  persistência: banco de dados MongoDB
import cliente from "./models/Cliente.js";
// Importando o conector do banco de dados
import conectaBaseMongoDB from "./config/dbConnect.js";
import Clientes from "./models/Cliente.js";
const conexao = await conectaBaseMongoDB();

import jwt from "jsonwebtoken";
const SECRET = 'voeBR123';

// Log para conexão se: erro
conexao.on("error",(erro) => {
console.error(Date() + " [ERROR] Erro na conexão com banco de dados.   ", erro);
});

//Log para conexão se: sucesso
conexao.once("open",() => {
console.error(Date() + "[INFO] Conexão com banco de dados feita com sucesso!");
});

//
const app = express();
app.use(express.json());

// Constante Cliente 
const clientesHC = [
   {id:100,nome: "Flávia Silva"},
   {id:200,nome: "Flávio Silva"}
]; 
        

//Consultando dados de Clientes acessando o modelo de banco de dados MongoDB
app.get("/clientes", async (req, res) => {
const listaClientes = await cliente.find({});
res.status(200).json(listaClientes);
})
 
function localizaCliente(id){
        return clientesHC.findIndex(cliente => {
            return cliente.id === Number(id);
        })
};




/* Bloco cliente - CRUD por array*/

// Consultando dados de Clientes 
app.get("/cliente", verifyJWT, (req,res) =>{
    console.log(Date() + 'User: ' + req.userId + ' fez uma chamada.');
    res.status(200).send(clientesHC)
});

//// POST COM AUTENTICAÇÂO
function verifyJWT(req,res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token,SECRET,(err,decoded) => {
        if (err) return res.status(410).end();
        req.userId = decoded.userId;
        next();

    })
}
app.post('/user',(req, res) => {
    if (req.body.user === 'voebr123' && req.body.password === '123') {
        const token = jwt.sign({userId:'voebr123'}, SECRET, {expiresIn:100});
        return res.json({auth:true,token});
    }
    else {}
    return res.status(401).end();
    }
    )

// Consultando dados de Clientes por Id   
app.get("/cliente/:id", (req, res)=>{
    const index = localizaCliente(req.params.id);
    res.status(200).json(clientesHC[index]);
    console.log(Date() + "Consulta a Cliente realizada");
});

// Gravando dados de Clientes 
app.post("/cliente",(req,res) =>{
    clientesHC.push(req.body);
res.status(201).send("Cliente cadastrado com sucesso!");
    });

// Atualizando dados de Clientes
app.put("/cliente/:id",(req,res) =>{
    const index = localizaCliente(req.params.id);
    clientesHC[index].nome = req.body.nome;
    res.status(200).json(clientesHC);
});

// Excluindo dados de Clientes
app.delete("/cliente/:id",(req,res)=>{
    const index = localizaCliente(req.params.id);
    clientesHC.splice(index,1);
    res.status(200).send("Cliente excluido com sucesso!");
});



// Constante Reservas
const reservas = [   
    {
        "CustumerId":"1",
        "IpAddressClient":"192.168.0.1",
        "SessionID":"0b332a048e5a26c9cb563fd40654d539beed38ec2",
        "CorrelationID":"237fb3670ca19ac512cb06b7d98fc555",
        "Payment":"Aguardando autorização",
        "CustumerAutentication":"Não autenticado",
        "Airline" : "VoeBR",
        "Flight" : "101",
        "AirportFrom" : "CGH",
        "AirportTo" : "CWB",
        "DayOfWeek" : 5,
        "Time" : 700,
        "Length" : 701,
        "region": "us-west-1",
        "datacenter": "dc2",
        "rack": "63",
        "os": "Ubuntu16.10",
        "arch": "x64",
        "team": "LON",
        "service": "6",
        "service_version": "1.5",
        "service_environment": "Prod",
        "path": "/dev/sda1",
        "fstype": "ext3",
        "metric_name:cpu.usr": 11.12,
        "metric_name:cpu.sys": 12.23,
        "metric_name:cpu.idle": 80.34
        }
    ]

app.get("/",(req,res)=> {
    res.status(200).send("<html><title>API VoeBR 123</title>Microserviço: API VoeBR 123</html>");
});

// Consultando dados de Reservas
app.get("/reservas",(req,res)=>{
    res.status(200).json(reservas);
    });
// Gravando dados de Reservas 
app.post("/reservas",(req,res) =>{
    reservas.push(req.body);
    res.status(201).send("Reserva recebida com sucesso!");
});











export default app;



