const express = require("express");
const router = express.Router();
const login = require("../middleware/login");

const AgendamentoController = require("../controllers/agendamento-controller");

router.post("/", login.obrigatorio, AgendamentoController.create);

router.get("/:id", login.obrigatorio, AgendamentoController.getCommunication);

router.patch("/:id/cancel", login.obrigatorio, AgendamentoController.cancel);

module.exports = router;
