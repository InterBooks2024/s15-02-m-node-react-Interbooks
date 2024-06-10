const ExchangeModel = require('../models/ExchangeRequest.js');
const BookModel = require('../models/BooksModel.js');
const UserModel = require('../models/User.js');
const { isValidObjectId } = require("mongoose")

// Jose 66585c44fb1c4bb8322adb3b -  Agatha 66586293889b4ca664d545b9
const createExchangeRequest = async (bookId, userIdFrom) => {
  if (isValidObjectId(bookId) == false) {
    return { error: 'Book not found' }
  }

  const book = await BookModel.findById(bookId)
  const UserIdFrom = await UserModel.findById(userIdFrom)
  const userIdTo = await UserModel.findById(book.userId)

  if (!book) {
    return { error: 'Book not found' }
  }

  if (!UserIdFrom) {
    return { error: 'User not found' }
  }

  if (userIdFrom == userIdTo._id) {
    return { error: 'The user cannot exchange, give or sell their book to themselves' }
  }

  // Añadir nombre del Usuario que creo la solicitud
  const exchangeRequest = new ExchangeModel({
    bookId,
    userIdFrom,
    usernameUserFrom: UserIdFrom.username,
    userIdTo,
    usernameUserTo: userIdTo.username,
    libraryUserFrom: UserIdFrom.books,
    phoneNumberUserFrom: UserIdFrom.phoneNumber
  });

  await exchangeRequest.save()
  return { "message": "Exchange request created", exchangeRequest }
};

const getAllExchangeRequestUserFromPending = async (userIdFrom) => {
  const exchangeRequest = await ExchangeModel.find({ userIdFrom: userIdFrom, status: 'pendiente' }).select('bookId userIdTo usernameUserTo actions status createdAt').lean()

  const verifyUserFrom = await ExchangeModel.find({ userIdFrom: userIdFrom }).select('userIdFrom').lean()

  if (verifyUserFrom.find(x => x.userIdFrom != userIdFrom)) {
    return { error: "The user is not the owner of the request" }
  }

  return exchangeRequest
}

const getAllRequestUserFromNotPending = async (userIdFrom, filters) => {
  const query = { userIdFrom, status: { $ne: 'pendiente' } }

  if (filters) {
    if (filters.usernameUserTo) {
      query.usernameUserTo = filters.usernameUserTo
    }

    if (filters.startDate && filters.endDate) {
      query.createdAt = { $gte: filters.startDate, $lte: filters.endDate }
    }
  }

  const exchangeRequest = await ExchangeModel.find(query).select('bookId userIdTo usernameUserTo actions status createdAt').lean()

  return exchangeRequest
};

const cancelExchangeRequestUserFrom = async (exchangeId, userIdFrom) => {
  try {
    if (!isValidObjectId(exchangeId)) {
      console.log(exchangeId)
      return { error: 'Exchange request not found' }
    }

    const verifyUserFrom = await ExchangeModel.findById(exchangeId).select('userIdFrom status').lean()

    if (!verifyUserFrom) {
      return { error: 'Exchange request not found' }
    }

    if (verifyUserFrom.userIdFrom != userIdFrom) {
      return { error: "User cannot modify this request" }
    }

    if (verifyUserFrom.status != 'pendiente') {
      return { error: 'Only pending requests can be modified' }
    }

    const exchangeRequest = await ExchangeModel.findByIdAndDelete(exchangeId, { status: 'pendiente' })

    return { message: 'Exchange request canceled', exchangeRequest }
  } catch (error) {
    console.log(error)
    return { error: 'Error canceling exchange request' }
  }
}

const deleteAllExchangeRequestUserFrom = async (userIdFrom) => {
  try {
    const verifyUserFrom = await ExchangeModel.find({ userIdFrom: userIdFrom, status: { $ne: 'pendiente' } }).select('userIdFrom userIdTo').lean()

    if (!verifyUserFrom || verifyUserFrom.length === 0) {
      return { error: 'The user has no exchange requests' }
    }

    if (verifyUserFrom.find(x => x.userIdFrom != userIdFrom)) {
      return { error: "The user is not the owner of the request" }
    }

    verifyUserFrom.map(async (exchange) => {
      if (exchange.userIdTo) {
        await ExchangeModel.updateOne({ _id: exchange._id }, { $set: { userIdFrom: null } })
      } else {
        await ExchangeModel.deleteOne({ _id: exchange._id })
      }
    })

    return { message: "All exchange requests submitted have been deleted" }
  } catch (error) {
    console.log(error)
    return { error: 'Error deleting exchange request' }
  }
}

const getAllExchangeRequestUserToPending = async (userIdTo) => {
  const exchangeRequest = await ExchangeModel.find({ userIdTo: userIdTo, status: 'pendiente' }).select('bookId userIdFrom usernameUserFrom actions status phoneNumberUserFrom createdAt libraryUserFrom').lean()

  const verifyUserTo = await ExchangeModel.find({ userIdTo: userIdTo }).select('userIdTo').lean()

  if (verifyUserTo.find(x => x.userIdTo != userIdTo)) {
    return { error: "The user is not the owner of the request" }
  }

  return exchangeRequest
}

const getAllExchangeRequestUserToNotPending = async (userIdTo, filters) => {
  const query = { userIdTo, status: { $ne: 'pendiente' } }

  if (filters) {
    if (filters.usernameUserFrom) {
      query.usernameUserFrom = filters.usernameUserFrom
    }

    if (filters.startDate && filters.endDate) {
      query.createdAt = { $gte: filters.startDate, $lte: filters.endDate }
    }
  }

  const exchangeRequest = await ExchangeModel.find(query).select('bookId userIdFrom usernameUserFrom actions status createdAt').lean()

  return exchangeRequest
}

const deleteAllExchangeRequestUserTo = async (userIdTo) => {
  try {
    const verifyUserTo = await ExchangeModel.find({ userIdTo: userIdTo, status: { $ne: 'pendiente' } }).select('userIdTo userIdFrom').lean()

    if (!verifyUserTo || verifyUserTo.length === 0) {
      return { error: 'The user has no exchange requests' }
    }

    if (verifyUserTo.find(x => x.userIdTo != userIdTo)) {
      return { error: "The user is not the owner of the request" }
    }

    verifyUserTo.map(async (exchange) => {
      if (exchange.userIdFrom) {
        await ExchangeModel.updateOne({ _id: exchange._id }, { $set: { userIdTo: null } })
      } else {
        await ExchangeModel.deleteOne({ _id: exchange._id })
      }
    })

    return { message: "All exchange requests received have been deleted" }
  } catch (error) {
    console.log(error)
    return { error: 'Error deleting exchange request' }
  }
}

const acceptExchangeRequest = async (exchangeRequestId, userId, bookUserFrom) => {
  if (isValidObjectId(exchangeRequestId) == false) {
    return { error: 'Exchange request not found' }
  }

  const exchangeRequest = await ExchangeModel.findById(exchangeRequestId)

  if (!exchangeRequest) {
    return { error: 'Exchange request not found' }
  }

  if (exchangeRequest.userIdFrom.toString() == userId.toString()) {
    return { error: 'User cannot modify this request' }
  }

  if (exchangeRequest.status != 'pendiente') {
    return { error: 'Only pending requests can be modified' }
  }

  if (!bookUserFrom || bookUserFrom == "") {
    return { error: 'Required book to exchange' }
  }

  if (isValidObjectId(bookUserFrom) == false) {
    return { error: 'Book not found' }
  }

  const { userIdFrom, userIdTo } = exchangeRequest
  const book = await BookModel.findById(exchangeRequest.bookId)
  const bookToExchange = await BookModel.findById(bookUserFrom)

  if (!bookToExchange) {
    return { error: 'Book to exchange not found' }
  }

  if (bookToExchange.userId.toString() != userIdFrom.toString()) {
    return { error: 'The user can only exchange books with the origin user' }
  }

  if (!book) {
    return { error: 'Book not found' }
  }

  exchangeRequest.bookOfferedId = bookToExchange._id
  await exchangeRequest.save()

  exchangeRequest.status = 'aceptada'
  bookToExchange.userId = userIdTo
  book.userId = userIdFrom

  await book.save()
  await bookToExchange.save()
  await exchangeRequest.save()
  return { message: 'Book exchanged successfully', exchangeRequest }
};

const rejectExchangeRequest = async (exchangeRequestId, userId) => {
  const exchangeRequest = await ExchangeModel.findById(exchangeRequestId)

  if (!exchangeRequest) {
    return { error: 'Exchange request not found' }
  }

  if (exchangeRequest.userIdFrom.toString() == userId.toString()) {
    return { error: 'User cannot modify this request' }
  }

  if (exchangeRequest.status != 'pendiente') {
    return { error: 'Only pending requests can be modified' }
  }

  exchangeRequest.status = 'rechazada'

  await exchangeRequest.save()
  return exchangeRequest
}

module.exports = {
  getAllExchangeRequestUserFromPending,
  getAllRequestUserFromNotPending,
  cancelExchangeRequestUserFrom,
  deleteAllExchangeRequestUserFrom,
  getAllExchangeRequestUserToPending,
  getAllExchangeRequestUserToNotPending,
  deleteAllExchangeRequestUserTo,
  createExchangeRequest,
  acceptExchangeRequest,
  rejectExchangeRequest
}