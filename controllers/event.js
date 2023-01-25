//! Import Dependencies
const express = require('express')
const Event = require('../models/event')

//! Create router
const router = express.Router()

// index ALL
router.get('/', (req, res) => {
	Event.find({})
		.then(events => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('events/index', { events, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const eventId = req.params.id
	Event.findById(eventId)
		.populate('comments.author', 'username')
		.then(event => {
            const {username, loggedIn, userId} = req.session
			res.render('events/show', { event, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

module.exports = router