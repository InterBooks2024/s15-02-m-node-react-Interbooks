const express = require('express')
const exchangeController = require('../controllers/exchangeController.js')
const passport = require('../middlewares/auth.middlewares');

const router = express.Router()

// Get de todas las peticiones creadas por el usuario
router.get('/exchanges/sent', passport.authenticate("jwt", { session: false }), exchangeController.getAllExchangeRequestUserFrom)

// Delete de todas las peticiones creadas por el usuario
router.delete('/exchanges/delete/sent', passport.authenticate("jwt", { session: false }), exchangeController.deleteAllExchangeRequestUserFrom)

// Get de todas las peticiones recibidas
router.get('/exchanges/received', passport.authenticate("jwt", { session: false }), exchangeController.getAllExchangeRequestUserTo)

// Delete de todas las peticiones recibidas
router.delete('/exchanges/delete/received', passport.authenticate("jwt", { session: false }), exchangeController.deleteAllExchangeRequestUserTo)

// Crear una peticion
router.post('/exchange/:bookId', passport.authenticate("jwt", { session: false }), exchangeController.requestExchange)

// Aceptar o rechazar una peticion
router.patch('/exchange/:exchangeRequestId/accept', passport.authenticate("jwt", { session: false }), exchangeController.acceptExchange)

router.patch('/exchange/:exchangeRequestId/reject', passport.authenticate("jwt", { session: false }), exchangeController.rejectExchange)

module.exports = router