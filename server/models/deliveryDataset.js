import mongoose from 'mongoose';

const deliveryDatasetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deliveryDate: { type: Date, required: true },
    items: [{ type: String }],
});

export default mongoose.model('DeliveryDataset', deliveryDatasetSchema);
