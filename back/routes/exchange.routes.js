const express = require('express')
const exchangeController = require('../controllers/exchangeController.js')
const passport = require('../middlewares/auth.middlewares');

const router = express.Router()

// Get de todas las peticiones creadas por el usuario
router.get('/exchanges/me', passport.authenticate("jwt", { session: false }), exchangeController.getAllExchangeRequestUserFrom)

// Get de todas las peticiones recibidas
router.get('/exchanges/received', passport.authenticate("jwt", { session: false }), exchangeController.getAllExchangeRequestUserTo)

// Crear una peticion
router.post('/exchange/:bookId', passport.authenticate("jwt", { session: false }), exchangeController.requestExchange)

// Aceptar o rechazar una peticion
router.patch('/exchange/:exchangeRequestId/accept', passport.authenticate("jwt", { session: false }), exchangeController.acceptExchange)

router.patch('/exchange/:exchangeRequestId/reject', passport.authenticate("jwt", { session: false }), exchangeController.rejectExchange)

module.exports = router