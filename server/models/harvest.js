import mongoose from 'mongoose';

const harvestSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model('Harvest', harvestSchema);
