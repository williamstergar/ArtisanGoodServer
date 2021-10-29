const express = require('express')
const router = express.Router();

const validateSession = require('../middleware/validate-jwt')
const artisanItem = require('../db').import('../models/artisanitem')

// CREATE ARTISAN ITEM //

router.post('/create', validateSession, async (req, res) => {
    const artisanItem = {
        name: req.body.artisanItem.name,
        price: req.body.artisanItem.price,
        description: req.body.artisanItem.description,
        availability: req.body.artisanItem.availability,
        photoURL: req.body.artisanItem.photoURL
    }

    artisanItem.create(artisanItemEntry)
        .then((artisanItems) => res.status(200).json(artisanItems))
        .catch((err) => res.status(500).json({ error: err }))
})

// DELETE ARTISAN ITEM //
router.delete('/delete/:id', validateSession, async (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id} }

    Product.destroy(query)
        .then(() => res.status(200).json({ message: 'Product Entry Removed' }))
        .catch((err) => res.status(500).json({ error: err }))
})

module.exports = router