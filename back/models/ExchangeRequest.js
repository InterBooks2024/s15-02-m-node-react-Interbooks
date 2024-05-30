const mongoose = require('mongoose')

const exchangesSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    userIdFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userIdTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookOfferedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    phoneNumberUserFrom: { type: mongoose.Schema.Types.String, ref: 'User' },
    status: {
        type: String,
        enum: ['pendiente', 'aceptada', 'rechazada'],
        default: 'pendiente'
    },
    actions: [{
        type: String,
        enum: [
            'Venta', 'Intercambio', 'Regalo'
        ],
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: false
})

const ExchangeModel = mongoose.model('exchanges', exchangesSchema, 'exchanges')

module.exports = ExchangeModel