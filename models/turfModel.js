import mongoose from "mongoose";


const turfSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    manager: [{ type: mongoose.Types.ObjectId, ref: "Manager" }]
},
    { timestamps: true }

);

const Turf = mongoose.model("Turf", turfSchema);

export default Turf;