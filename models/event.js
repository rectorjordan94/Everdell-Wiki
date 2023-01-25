const mongoose = require('./connection')

const User = require('./user')

const { Schema, model } = mongoose

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    requiredCards: {
        type: Array,
        required: true
    },
    effect: {
        type: String,
        required: true
    },
    points: {
        type: Number
    }
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'User',
    },
    comments: [commentSchema]
})

const Event = model('Event', eventSchema)

module.exports = Event