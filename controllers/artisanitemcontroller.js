module.exports = router
let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/validate-jwt");
const Product = require("../db").import("../models/artisanitem");

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

router.get("/", (req, res) => {
    Product.findAll()
        .then((products) => res.status(200).json(products))
        .catch((err) => res.status(500).json({error: err}));
});

router.get("/owner", validateSession, function (req, res) {
    let userid = req.user.id;

    Product.findAll({
        where: {owner: userid },
    })
        .then((products) => res.status(200).json(products))
        .catch((err) => res.status(500).json({err: err}));
});

router.get("/:name", function (req, res) {
    let name = req.params.name;
  
    Product.findAll({
      where: { name: name },
    })
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json({ error: err }));
  });

  router.put("/edit/:id", validateSession, function (req, res) {
    const updateProductEntry = {
      name: req.body.product.name,
      price: req.body.product.price,
      description: req.body.product.description,
      availability: req.body.product.availability,
      photoURL: req.body.product.photoURL,
    };
    const query = { where: { id: req.params.id, owner: req.user.id } };
    
    Product.update(updateProductEntry, query)
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json({ error: err }));
  });

// DELETE ARTISAN ITEM //
router.delete('/delete/:id', validateSession, async (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id} }

    Product.destroy(query)
        .then(() => res.status(200).json({ message: 'Product Entry Removed' }))
        .catch((err) => res.status(500).json({ error: err }))
})