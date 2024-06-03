const exchangeService = require('../services/exchangeService.js')

const getAllExchangeRequestUserFrom = async (req, res) => {
  try {
    const userIdFrom = req.user.id
    const exchangeRequest = await exchangeService.getAllExchangeRequestUserFrom(userIdFrom)

    if (exchangeRequest.error == "The user is not the owner of the request") {
      return res.status(403).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when getting all exchange request' })
  }
}

const deleteAllExchangeRequestUserFrom = async (req, res) => {
  try {
    const userIdFrom = req.user.id
    const exchangeRequest = await exchangeService.deleteAllExchangeRequestUserFrom(userIdFrom)

    if (exchangeRequest.error == "The user has no exchange requests") {
      return res.status(400).json(exchangeRequest)
    }

    if (exchangeRequest.error == "The user is not the owner of the request") {
      return res.status(403).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when deleting all exchange request' })
  }
}

const getAllExchangeRequestUserTo = async (req, res) => {
  try {
    const userIdTo = req.user.id
    const exchangeRequest = await exchangeService.getAllExchangeRequestUserTo(userIdTo)

    if (exchangeRequest.error == "The user is not the owner of the request") {
      return res.status(403).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when getting all exchange request' })
  }
}

const deleteAllExchangeRequestUserTo = async (req, res) => {
  try {
    const userIdTo = req.user.id
    const exchangeRequest = await exchangeService.deleteAllExchangeRequestUserTo(userIdTo)

    if (exchangeRequest.error == "The user is not the owner of the request") {
      return res.status(403).json(exchangeRequest)
    }

    if (exchangeRequest.error == "The user has no exchange requests") {
      return res.status(400).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when deleting all exchange request' })
  }
}

const requestExchange = async (req, res) => {
  try {
    const bookId = req.params.bookId
    const userIdFrom = req.user.id

    const exchangeRequest = await exchangeService.createExchangeRequest(bookId, userIdFrom)

    if (exchangeRequest.error == "Book not found") {
      return res.status(404).json(exchangeRequest)
    }

    if (exchangeRequest.error == "User not found") {
      return res.status(404).json(exchangeRequest)
    }

    if (exchangeRequest.error == "The user cannot exchange, give or sell their book to themselves") {
      return res.status(400).json(exchangeRequest)
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
    const bookUserFrom = req.body.bookUserFrom
    const exchangeRequest = await exchangeService.acceptExchangeRequest(exchangeRequestId, userId, bookUserFrom)

    if (exchangeRequest.error == "Exchange request not found") {
      return res.status(404).json(exchangeRequest)
    }

    if (exchangeRequest.error == "User cannot modify this request") {
      return res.status(403).json(exchangeRequest)
    }

    if (exchangeRequest.error == "Only pending requests can be modified") {
      return res.status(400).json(exchangeRequest)
    }

    if (exchangeRequest.error == "Book to exchange not found") {
      return res.status(404).json(exchangeRequest)
    }

    if (exchangeRequest.error == "Required book to exchange") {
      return res.status(400).json(exchangeRequest)
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

    if (exchangeRequest.error == "Only pending requests can be modified") {
      return res.status(400).json(exchangeRequest)
    }

    res.status(200).json(exchangeRequest)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error when rejecting exchange' })
  }
}

module.exports = {
  getAllExchangeRequestUserFrom,
  deleteAllExchangeRequestUserFrom,
  getAllExchangeRequestUserTo,
  deleteAllExchangeRequestUserTo,
  requestExchange,
  acceptExchange,
  rejectExchange
}