//! Dependencies
const mongoose = require('./connection')
const Card = require('./card')

const db = mongoose.connection

db.on('open', () => {

    const startEvents = [
        { name: 'Tax Relief', requiredCards: ['Judge', 'Queen'], effect: 'Activate Production.', points: 3 },
        { name: 'Under New Management', requiredCards: ['Peddler', 'General Store'], effect: 'When achieved, you may place up to 3 of any resource here. Each berry or twig placed here is worth 1 point. Each resin or pebble placed here is worth 2 points.'},
        { name: 'Path of the Pilgrims', requiredCards: ['Monastery', 'Wanderer'], effect: '3 points for each worker in your Monastery.'},
        { name: 'Graduation of Scholars', requiredCards: ['Monastery', 'Wanderer'], effect: '3 points for each worker in your Monastery.'},
        ]

        // name: {
        //     type: String,
        //     required: true
        // },
        // requiredCards: {
        //     type: Array,
        //     required: true
        // },
        // effect: {
        //     type: String,
        //     required: true
        // },

    Event.deleteMany({ owner: null })
        .then(() => {
            Event.create(startEvents)
                .then(data => {
                    console.log('here are the starter events: \n', data)
                    db.close()
                })
                .catch(err => {
                    console.log('the folowing error occured: \n', err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})