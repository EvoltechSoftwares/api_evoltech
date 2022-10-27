import express from "express";
import cors from "cors";
import {executeQuery} from "./config/database.js"

const app = express();

//Middleware -> Programa/Código que fica entre a req e o restante da app.

//Middleware JSON
app.use(express.json());

//Middleware CORS
app.use(cors());

//Rotas
app.get("/produtos", function(req, res){
let filtro = [];
let ssql = "SELECT * FROM PRODUTOS WHERE COD > 0"

//EXEMPLO DE FILTRO 
if(req.query.descricao){
    ssql += "and descricao like ?";
    filtro.push("%" + req.query.descricao + "%")
}

executeQuery(ssql, filtro, function(err, result){
if (err){
res.status(500).json(err);
} else {
res.status(200).json(result);
    }

    });
});



app.post("/produtos", function(req, res){
   
    let ssql = "INSERT INTO PRODUTOS(COD, NOME) VALUES (?,?) RETURNING COD" 
    

    executeQuery(ssql, [req.body.NOME], function(err, result){
    if (err){
    res.status(500).json(err);
    } else {
    res.status(201).json({COD: result.COD});
        }
    
        });
    });

//Sempre que aplicação vai pro ar, chama essa função
app.listen(3000, function(){
    console.log("Servidor no ar");
});