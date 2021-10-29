let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/validate-jwt");
const Product = require("../db").import("../models/artisanitem");




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

