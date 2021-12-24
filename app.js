const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const rotaAgendamentos = require("./routes/agendamentos-route");
const rotaUsuarios = require("./routes/users-route");

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/communications", rotaAgendamentos);
app.use("/users", rotaUsuarios);

//Quando não encontra a rota
app.use((req, res, next) => {
  const erro = new Error("Não Encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, resp, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
