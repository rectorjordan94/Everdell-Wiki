// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const cardSchema = new Schema(
	{
		name: { type: String, required: true },
		rarity: { type: String, required: true },
        type: { type: Array, required: true },
		points: { type: Number, required: true },
		cost: { type: String, required: true },
		pairedWith: { type: String, required: true },
		effect: { type: String, required: true },
		quote: { type: String },
		destination: { type: Boolean },
		occupancy: { type: Number },
		imgSrc: { type: String },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Card = model('Card', cardSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Card
