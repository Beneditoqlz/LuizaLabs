const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const AgendamentoController = require('../controllers/agendamento-controller');

router.post('/',login.obrigatorio,AgendamentoController.postAgendamentos);

router.get('/',AgendamentoController.getAgendamentos);

router.get('/:id',AgendamentoController.getAgendamentoEspecifico);

router.patch('/',login.obrigatorio,AgendamentoController.updateAgendamentos);







module.exports = router;