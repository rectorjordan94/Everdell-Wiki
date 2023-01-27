//! Dependencies
const mongoose = require('./connection')
const Event = require('./event')

const db = mongoose.connection

db.on('open', () => {

    const startEvents = [
        { name: 'Tax Relief', requiredCards: ['Judge', 'Queen'], ability: 'Activate Production.', scoring: '3 points', imgSrc: '/images/events/tax.jpg'},
        { name: 'Under New Management', requiredCards: ['Peddler', 'General Store'], ability: 'When achieved, you may place up to 3 of any resource here.', scoring: 'Each berry or twig placed here is worth 1 point. Each resin or pebble placed here is worth 2 points.', imgSrc: '/images/events/under.jpg'},
        { name: 'Path of the Pilgrims', requiredCards: ['Monastery', 'Wanderer'], scoring: '3 points for each worker in your Monastery.', imgSrc: '/images/events/path.jpg'},
        { name: 'Graduation of Scholars', requiredCards: ['Teacher', 'University'], ability: 'When achieved, you may place up to 3 Critters from your hand beneath this Event.', scoring: '2 points for each Critter beneath this Event.' , imgSrc: '/images/events/graduation.jpg'},
        { name: 'A Brilliant Marketing Plan', requiredCards: ['Shopkeeper', 'Post Office'], ability: 'When achieved, you may give opponents up to a total of 3 of any resource.', scoring: 'For each donation gain 2 points.', imgSrc: '/images/events/brilliant.jpg'},
        { name: 'Capture of the Acorn Thieves', requiredCards: ['Courthouse', 'Ranger'], ability: 'When achieved, place up to 2 Critters from your city beneath this Event.', scoring: '2 points for each Critter beneath this Event.', imgSrc: '/images/events/capture.jpg' },
        { name: 'Ancient Scrolls Discovered', requiredCards: ['Historian', 'Ruins'], ability: 'When achieved, reveal 5 cards. You may draw any or place any beneath this Event.', scoring: '1 point for each card beneath this Event.', imgSrc: '/images/events/ancient.jpg' },
        { name: 'An Evening of Fireworks', requiredCards: ['Lookout', 'Miner Mole'], ability: 'When achieved, you may place up to 3 twigs here.', scoring: '2 point for each twig on this Event.', imgSrc: '/images/events/evening.jpg' },
        { name: 'A Well Run City', requiredCards: ['Chip Sweep', 'Clock Tower'], ability: 'When achieved, bring back one of your deployed workers.', scoring: '4 points', imgSrc: '/images/events/well.jpg' },
        { name: 'Croak Wart Cure', requiredCards: ['Undertaker', 'Barge Toad'], ability: 'When achieved, pay 2 berries and discard 2 cards from your city.', scoring: '6 points', imgSrc: '/images/events/croak.jpg' },
        { name: 'Flying Doctor Service', requiredCards: ['Doctor', 'Postal Pigeon'], scoring: '3 points for each Husband/Wife pair in every city.', imgSrc: '/images/events/flying.jpg' },
        { name: 'Remembering the Fallen', requiredCards: ['Cemetery', 'Shepherd'], scoring: '3 points for each buried worker in your Cemetery.', imgSrc: '/images/events/remembering.jpg' },
        { name: 'Performer in Residence', requiredCards: ['Inn', 'Bard'], ability: 'When achieved, you may place up to 3 berries here.', scoring: '2 points for each berry on this Event.', imgSrc: '/images/events/performer.jpg' },
        { name: 'Ministering to Miscreants', requiredCards: ['Monk', 'Dungeon'], scoring: '3 points for each prisoner in your Dungeon.', imgSrc: '/images/events/ministering.jpg' },
        { name: 'The Everdell Games', requiredCards: ['2 Tan Traveler', '2 Green Production', '2 Red Destination', '2 Blue Governance', '2 Purple Prosperity'], scoring: '9 points.', imgSrc: '/images/events/games.jpg' },
        { name: 'Pristine Chapel Ceiling', requiredCards: ['Woodcarver', 'Chapel'], ability: 'When achieved, draw 1 card and receive 1 of any resource for each point token on your Chapel.', scoring: '2 poits for each point token on your Chapel.', imgSrc: '/images/events/pristine.jpg' },
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