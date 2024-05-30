const ExchangeModel = require('../models/ExchangeRequest.js');
const BookModel = require('../models/BooksModel.js');
const UserModel = require('../models/User.js');

const getAllExchangeRequestUserFrom = async (userIdFrom) => {
  const exchangeRequest = await ExchangeModel.find({ userIdFrom: userIdFrom }).select('userIdTo actions status createdAt').lean()

  if (!exchangeRequest || exchangeRequest.length === 0) {
    return { error: 'Exchanges requests not found' }
  }

  return exchangeRequest
}

const getAllExchangeRequestUserTo = async (userIdTo) => {
  const exchangeRequest = await ExchangeModel.find({ userIdTo: userIdTo }).select('userIdFrom actions status phoneNumberUserFrom createdAt').lean()

  if (!exchangeRequest || exchangeRequest.length === 0) {
    return { error: 'Exchanges requests not found' }
  }
  return exchangeRequest
}

const createExchangeRequest = async (bookId, userIdFrom, userIdTo, bookOfferedId) => {
  const book = await BookModel.findById(bookOfferedId)
  const bookToExchange = await BookModel.findOne({ userId: userIdTo })
  const UserFrom = await UserModel.findById(userIdFrom)

  if (!book) {
    return { error: 'Book not found' }
  }

  if (book.userId.toString() !== userIdFrom.toString()) {
    return { error: 'The user is not the owner of the book' }
  }

  if (!bookToExchange) {
    return { error: 'Book to exchange not found' }
  }

  const exchangeRequest = new ExchangeModel({
    bookId,
    userIdFrom,
    userIdTo,
    bookOfferedId,
    phoneNumberUserFrom: UserFrom.phoneNumber
  });

  await exchangeRequest.save()
  return { "message": "Exchange request created", exchangeRequest }
};


const acceptExchangeRequest = async (exchangeRequestId, userId) => {
  const exchangeRequest = await ExchangeModel.findById(exchangeRequestId)

  if (!exchangeRequest) {
    return { error: 'Exchange request not found' }
  }
  if (exchangeRequest.userIdFrom.toString() !== userId.toString()) {
    return { error: 'User cannot modify this request' }
  }

  const { bookId, userIdFrom, userIdTo, bookOfferedId } = exchangeRequest
  const book = await BookModel.findById(exchangeRequest.bookId)
  const bookToExchange = await BookModel.findById(exchangeRequest.bookOfferedId)

  exchangeRequest.status = 'aceptada'
  bookOfferedId.userId = userIdTo
  bookId.userId = userIdFrom

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

  if (exchangeRequest.userIdFrom.toString() !== userId.toString()) {
    return { error: 'User cannot modify this request' }
  }

  exchangeRequest.status = 'rechazada'

  await exchangeRequest.save()
  return exchangeRequest
}

module.exports = {
  getAllExchangeRequestUserFrom,
  getAllExchangeRequestUserTo,
  createExchangeRequest,
  acceptExchangeRequest,
  rejectExchangeRequest
}