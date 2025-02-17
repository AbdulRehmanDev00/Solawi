import express from 'express';
import Harvest from '../models/Harvest.js';

const router = express.Router();

// Add a new harvest
router.post('/harvest', async (req, res) => {
    try {
        const { crop, quantity } = req.body;
        const newHarvest = new Harvest({ crop, quantity });
        await newHarvest.save();
        res.status(201).json({ success: true, message: 'Harvest saved successfully' });
    } catch (error) {
        console.error('Error saving harvest:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
