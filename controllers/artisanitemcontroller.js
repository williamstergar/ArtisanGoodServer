let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-jwt");
const { ItemModel } = require("../models");


// CREATE ARTISAN ITEM //
router.post('/create', validateSession, async (req, res) => {
    const {name, price, description, availability, photoURL} = req.body;
    const { id } = req.user;
    const itemEntry = {
        name,
        price,
        description,
        availability,
        photoURL,
        owner_id: id
    }
    try {
        const newItem = await ItemModel.create(itemEntry);
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;