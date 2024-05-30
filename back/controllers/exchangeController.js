const exchangeService = require('../services/exchangeService.js')

const getAllExchangeRequestUserFrom = async (req, res) => {
  try {
    const userIdFrom = req.user.id
    const exchangeRequest = await exchangeService.getAllExchangeRequestUserFrom(userIdFrom)

    if (exchangeRequest.error == "Exchange request not found") {
      return res.status(404).json(exchangeRequest)
    }

    if (exchangeRequest.error == "The user is not the owner of the request") {
      return res.status(401).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when getting all exchange request' })
  }
}

const getAllExchangeRequestUserTo = async (req, res) => {
  try {
    const userIdTo = req.user.id
    const exchangeRequest = await exchangeService.getAllExchangeRequestUserTo(userIdTo)

    if (exchangeRequest.error == "Exchange request not found") {
      return res.status(404).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when getting all exchange request' })
  }
}

const requestExchange = async (req, res) => {
  try {
    const bookId = req.params.bookId
    const userIdFrom = req.user.id
    const userIdTo = req.body.userIdTo
    const bookOfferedId = req.body.bookOfferedId

    const exchangeRequest = await exchangeService.createExchangeRequest(bookId, userIdFrom, userIdTo, bookOfferedId)

    if (exchangeRequest.error == "Book not found") {
      return res.status(404).json(exchangeRequest)
    }
    if (exchangeRequest.error == "The user is not the owner of the book") {
      return res.status(403).json(exchangeRequest)
    }

    if (exchangeRequest.error == "Book to exchange not found") {
      return res.status(404).json(exchangeRequest)
    }

    res.status(201).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error create exchange request' })
  }
}

const acceptExchange = async (req, res) => {
  try {
    const exchangeRequestId = req.params.exchangeRequestId
    const userId = req.user.id
    const exchangeRequest = await exchangeService.acceptExchangeRequest(exchangeRequestId, userId)

    if (exchangeRequest.error == "Exchange request not found") {
      return res.status(404).json(exchangeRequest)
    }
    if (exchangeRequest.error == "User cannot modify this request") {
      return res.status(403).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when accepting exchange' })
  }
}

const rejectExchange = async (req, res) => {
  try {
    const exchangeRequestId = req.params.exchangeRequestId
    const userId = req.user.id
    const exchangeRequest = await exchangeService.rejectExchangeRequest(exchangeRequestId, userId)

    if (exchangeRequest.error == "Exchange request not found") {
      return res.status(404).json(exchangeRequest)
    }
    if (exchangeRequest.error == "User cannot modify this request") {
      return res.status(403).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when rejecting exchange' })
  }
}

module.exports = {
  getAllExchangeRequestUserFrom,
  getAllExchangeRequestUserTo,
  requestExchange,
  acceptExchange,
  rejectExchange
}