import express from 'express';
import DeliveryDataset from '../models/deliveryDataset.js';

const router = express.Router();

// Save delivery dataset
router.post('/delivery', async (req, res) => {
    try {
        const { user, deliveryDate, items } = req.body;
        const newDelivery = new DeliveryDataset({ user, deliveryDate, items });
        await newDelivery.save();
        res.status(201).json({ success: true, message: 'Delivery dataset saved successfully' });
    } catch (error) {
        console.error('Error saving delivery dataset:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
