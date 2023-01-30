// Import Dependencies
const express = require('express')
const Card = require('../models/card')

// Create router
const router = express.Router()

const normalizeText = (text) => {
    const words = text.split(' ')
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
    }
    const name = words.join(' ')
    return name
}

router.get('/', function(req, res) {
    const name = req.query.name
    Card.findOne().where({ name: `${normalizeText(name)}` })
        .then(card => {
            res.redirect(`/cards/${card.id}`)
        })
        .catch((error) => {
            console.log(error)
			res.status(400)
		})
})

normalizeText('chip sweep')

module.exports = router