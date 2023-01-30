const express = require('express')

// Create router
const router = express.Router()

router.get('/setup', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('gameInfo/setup.liquid', { loggedIn, username, userId })
})

router.get('/howtoplay', (req, res) => {
    const { username, userId, loggedIn } = req.session
    res.render('gameInfo/howToPlay.liquid', { loggedIn, username, userId})
})





module.exports = router;