// Import Dependencies
const express = require('express')
const Card = require('../models/card')

// Create router
const router = express.Router()

router.get('/', function(req, res) {
    const name = req.query.name
    Card.findOne().where({ name: `${name}` })
        .then(card => {
            res.redirect(`/cards/${card.id}`)
        })
        .catch(err => console.log(err))
})

module.exports = router