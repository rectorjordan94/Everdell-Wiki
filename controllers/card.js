// Import Dependencies
const express = require('express')
const Card = require('../models/card')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	console.log(req.query)
	Card.find({})
		.then(cards => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('cards/index', { cards, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

router.get('/critters', (req, res) => {
	const { username, userId, loggedIn } = req.session
	Card.find().where({ type: 'Critter'})
		.then(cards => {
			res.render('cards/index', { cards, ...req.session })
		})
		.catch(err => {
			res.redirect(`/error?error=${err}`)
		})
})

// index that shows only the user's cards
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Card.find({ owner: userId })
		.then(cards => {
			res.render('cards/index', { cards, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('cards/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Card.create(req.body)
		.then(card => {
			console.log('this was returned from create', card)
			res.redirect('/cards')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const cardId = req.params.id
	Card.findById(cardId)
		.then(card => {
			res.render('cards/edit', { card, ...req.session })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const cardId = req.params.id
	Card.findByIdAndUpdate(cardId, req.body, { new: true })
		.then(card => {
			res.redirect(`/cards/${card.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const cardId = req.params.id
	Card.findById(cardId)
		.populate('comments.author', 'username')
		.then(card => {
            const {username, loggedIn, userId} = req.session
			res.render('cards/show', { card, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const cardId = req.params.id
	Card.findByIdAndRemove(cardId)
		.then(card => {
			res.redirect('/cards')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
