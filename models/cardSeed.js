//! Dependencies
const mongoose = require('./connection')
const Card = require('./card')

const db = mongoose.connection

db.on('open', () => {

    const startCards = [
        { name: 'Architect', rarity: 'Unique', type: ['Purple Prosperity', 'Critter'], points: 2, cost: '4 Berries', pairedWith: 'Crane', effect: '1 point for each of your unused resin and pebbles, to a maximum of 6.', quote: 'If we build it, they will come scurrying.', imgSrc: '../images/architect.jpg' },
        { name: 'Bard', rarity: 'Unique', type: ['Tan Traveler', 'Critter'], points: 0, cost: '3 Berries', pairedWith: 'Theater', effect: 'You may discard up to 5 cards to gain 1 point token each.', quote: 'Listen to my tale of your heroic exploits, be they ever few.' },
        { name: 'Barge Toad', rarity: 'Common', type: ['Green Production', 'Critter'], points: 1, cost: '2 Berries', pairedWith: 'Twig Barge', effect: 'Gain 2 twigs for each Farm in your city.', quote: `I'll be workin' till I croak.` },
        { name: 'Chip Sweep', rarity: 'Common', type: ['Green Production', 'Critter'], points: 2, cost: '3 Berries', pairedWith: 'Resin Refinery', effect: 'Activate 1 Green Production in your city.', quote: 'Keep yer nose clean and yer chimney cleaner!' },
        { name: 'Doctor', rarity: 'Unique', type: ['Green Production', 'Critter'], points: 4, cost: '4 Berries', pairedWith: 'University', effect: 'You may pay up to 3 berries to gain 1 point token each.', quote: 'Hold still, this will hurt you more than me.' },
        { name: 'Castle', rarity: 'Unique', type: ['Purple Prosperity', 'Construction'], points: 4, cost: '2 Twigs, 3 Resin, 3 Pebbles', pairedWith: 'King', effect: '1 point for each Common Construction in your city.' },
        { name: 'Cemetery', rarity: 'Unique', type: ['Red Destination', 'Construction'], points: 0, cost: '2 Pebbles', pairedWith: 'Undertaker', effect: 'Reveal 4 cards from the deck or discard pile and play 1 for free. Discard the others. Worker stays here permanently.', destination: true, occupancy: 2 },
        { name: 'Chapel', rarity: 'Unique', type: ['Red Destination', 'Construction'], points: 2, cost: '2 Twigs, 1 Resin, 1 Pebble', pairedWith: 'Shepherd', effect: 'Place 1 point token on this Chapel, then draw 2 cards for each point token on this Chapel.', destination: true, occupancy: 1 },
        { name: 'Clock Tower', rarity: 'Unique', type: ['Blue Governance', 'Construction'], points: 0, cost: '3 Twigs, 1 Pebble', pairedWith: 'Historian', effect: 'When played, place 3 point tokens here. At the beginning of Preparing for Season, you may pay 1 point token from here to activate 1 of the Basic or Forest locations where you have a worker deployed.'},
        { name: 'Courthouse', rarity: 'Unique', type: ['Blue Governance', 'Construction'], points: 2, cost: '1 Twig, 1 Resin, 2 Pebbles', pairedWith: 'Judge', effect: 'Gain 1 twig or 1 resin or 1 pebble after you play a Construction.' }
        ]

        // name: { type: String, required: true },
		// rarity: { type: String, required: true },
        // type: { type: String, required: true },
		// points: { type: Number, required: true },
		// critterOrConstruction: { type: String, required: true },
		// cost: { type: String, required: true },
		// pairedWith: { type: String, required: true },
		// effect: { type: String, required: true },
		// quote: { type: String },
		// destination: { type: Boolean },
		// occupancy: { type: Number },

    Card.deleteMany({ owner: null })
        .then(() => {
            Card.create(startCards)
                .then(data => {
                    console.log('here are the starter cards: \n', data)
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