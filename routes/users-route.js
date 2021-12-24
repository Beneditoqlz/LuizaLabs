const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsuariosController = require("../controllers/user-controller");

router.post("/register", UsuariosController.cadastrarUsuarios);

router.post("/login", UsuariosController.efetuarLogin);

module.exports = router;
