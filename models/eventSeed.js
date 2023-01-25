//! Dependencies
const mongoose = require('./connection')
const Event = require('./event')

const db = mongoose.connection

db.on('open', () => {

    const startEvents = [
        { name: 'Tax Relief', requiredCards: ['Judge', 'Queen'], ability: 'Activate Production.', scoring: '3 points'},
        { name: 'Under New Management', requiredCards: ['Peddler', 'General Store'], ability: 'When achieved, you may place up to 3 of any resource here.', scoring: 'Each berry or twig placed here is worth 1 point. Each resin or pebble placed here is worth 2 points.', imgSrc: '/images/under_new_management.png'},
        { name: 'Path of the Pilgrims', requiredCards: ['Monastery', 'Wanderer'], scoring: '3 points for each worker in your Monastery.'},
        { name: 'Graduation of Scholars', requiredCards: ['Teacher', 'University'], ability: 'When achieved, you may place up to 3 Critters from your hand beneath this Event.', scoring: '2 points for each Critter beneath this Event.'},
        { name: 'A Brilliant Marketing Plan', requiredCards: ['Shopkeeper', 'Post Office'], ability: 'When achieved, you may give opponents up to a total of 3 of any resource.', scoring: 'For each donation gain 2 points.'},
        { name: 'Capture of the Acorn Thieves', requiredCards: ['Courthouse', 'Ranger'], ability: 'When achieved, place up to 2 Critters from your city beneath this Event.', scoring: '2 points for each Critter beneath this Event.' },
        { name: 'Ancient Scrolls Discovered', requiredCards: ['Historian', 'Ruins'], ability: 'When achieved, reveal 5 cards. You may draw any or place any beneath this Event.', scoring: '1 point for each card beneath this Event.' },
        { name: 'An Evening of Fireworks', requiredCards: ['Lookout', 'Miner Mole'], ability: 'When achieved, you may place up to 3 twigs here.', scoring: '2 point for each twig on this Event.' },
        { name: 'A Well Run City', requiredCards: ['Chip Sweep', 'Clock Tower'], ability: 'When achieved, bring back one of your deployed workers.', scoring: '4 points' },
        { name: 'Croak Wart Cure', requiredCards: ['Undertaker', 'Barge Toad'], ability: 'When achieved, pay 2 berries and discard 2 cards from your city.', scoring: '6 points' },
        { name: 'Flying Doctor Service', requiredCards: ['Doctor', 'Postal Pigeon'], scoring: '3 points for each Husband/Wife pair in every city.' },
        { name: 'Remembering the Fallen', requiredCards: ['Cemetery', 'Shepherd'], scoring: '3 points for each buried worker in your Cemetery.' },
        { name: 'Performer in Residence', requiredCards: ['Inn', 'Bard'], ability: 'When achieved, you may place up to 3 berries here.', scoring: '2 points for each berry on this Event.' },
        { name: 'Ministering to Miscreants', requiredCards: ['Monk', 'Dungeon'], scoring: '3 points for each prisoner in your Dungeon.' },
        { name: 'The Everdell Games', requiredCards: ['2 Tan Traveler', '2 Green Production', '2 Red Destination', '2 Blue Governance', '2 Purple Prosperity'], scoring: '9 points.' }
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

    Event.deleteMany()
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