const mongoose = require('./connection')

const User = require('./user')

const { Schema, model } = mongoose

const commentSchema = require('./comment')

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    requiredCards: {
        type: Array,
        required: true
    },
    ability: {
        type: String,
    },
    scoring: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String
    },
    comments: [commentSchema]
})

const Event = model('Event', eventSchema)

module.exports = Event