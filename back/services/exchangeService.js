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

const getAllExchangeRequestUserFrom = async (userIdFrom) => {
  const exchangeRequest = await ExchangeModel.find({ userIdFrom: userIdFrom }).select('userIdTo usernameUserTo actions status createdAt').lean()

  const verifyUserFrom = await ExchangeModel.find({ userIdFrom: userIdFrom }).select('userIdFrom').lean()

  if (verifyUserFrom.find(x => x.userIdFrom != userIdFrom)) {
    return { error: "The user is not the owner of the request" }
  }

  return exchangeRequest
}

const deleteAllExchangeRequestUserFrom = async (userIdFrom) => {
  try {
    const verifyUserFrom = await ExchangeModel.find({ userIdFrom: userIdFrom, status: { $ne: 'pendiente' } }).select('userIdFrom').lean()

    if (!verifyUserFrom || verifyUserFrom.length === 0) {
      return { error: 'The user has no exchange requests' }
    }

    if (verifyUserFrom.find(x => x.userIdFrom != userIdFrom)) {
      return { error: "The user is not the owner of the request" }
    }

    const exchangeRequest = await ExchangeModel.deleteMany({ userIdFrom: userIdFrom, status: { $ne: 'pendiente' } })


    return { message: "All exchange requests submitted have been deleted", exchangeRequest }
  } catch (error) {
    console.log(error)
    return { error: 'Error deleting exchange request' }
  }
}

const getAllExchangeRequestUserTo = async (userIdTo) => {
  const exchangeRequest = await ExchangeModel.find({ userIdTo: userIdTo }).select('userIdFrom usernameUserFrom actions status phoneNumberUserFrom createdAt libraryUserFrom').lean()

  const verifyUserTo = await ExchangeModel.find({ userIdTo: userIdTo }).select('userIdTo').lean()

  if (verifyUserTo.find(x => x.userIdTo != userIdTo)) {
    return { error: "The user is not the owner of the request" }
  }

  return exchangeRequest
}

const deleteAllExchangeRequestUserTo = async (userIdTo) => {
  try {
    const verifyUserTo = await ExchangeModel.find({ userIdTo: userIdTo, status: { $ne: 'pendiente' } }).select('userIdTo').lean()

    if (!verifyUserTo || verifyUserTo.length === 0) {
      return { error: 'The user has no exchange requests' }
    }

    if (verifyUserTo.find(x => x.userIdTo != userIdTo)) {
      return { error: "The user is not the owner of the request" }
    }

    const exchangeRequest = await ExchangeModel.deleteMany({ userIdTo: userIdTo, status: { $ne: 'pendiente' } })


    return { message: "All exchange requests received have been deleted", exchangeRequest }
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
  getAllExchangeRequestUserFrom,
  deleteAllExchangeRequestUserFrom,
  getAllExchangeRequestUserTo,
  deleteAllExchangeRequestUserTo,
  createExchangeRequest,
  acceptExchangeRequest,
  rejectExchangeRequest
}